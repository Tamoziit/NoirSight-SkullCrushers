from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from typing import List
from dotenv import load_dotenv
import os
import nltk
from newspaper import Article
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from urllib.parse import quote_plus, urlparse, parse_qs
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain_core.prompts import ChatPromptTemplate
from concurrent.futures import ThreadPoolExecutor, as_completed
import re

load_dotenv()
nltk.download("punkt")

app = FastAPI()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.1,
    max_output_tokens=512
)

prompt = ChatPromptTemplate.from_template(
    """You are a fact-checking assistant.

We have two articles: one is an original report, and the other is a reference article from another source.

ORIGINAL ARTICLE:
\"\"\"{original}\"\"\"

REFERENCE ARTICLE FROM {source}:
\"\"\"{reference}\"\"\"

Compare the reference article to the original and answer the following in 3 clear sentences:
1. Are both articles reporting on the same incident? Explain briefly.
2. Are there any factual inconsistencies between them?
3. Do you observe signs of exaggeration, misinformation, or missing details?

Conclude by stating whether the reference article is overall **consistent**, **partially consistent**, or **inconsistent** with the original.
"""
)

chain = LLMChain(llm=llm, prompt=prompt)

class URLRequest(BaseModel):
    url: HttpUrl

class ComparisonResult(BaseModel):
    url: HttpUrl
    flag: str 
    reasons: List[str]

def fetch_article_text(url):
    try:
        article = Article(url, language="en")
        article.download()
        article.parse()
        return article
    except Exception as e:
        print(f"Failed to fetch article: {e}")
        return None

def google_news_urls_with_selenium(query, num_results=5):
    try:
        options = Options()
        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("user-agent=Mozilla/5.0")
        options.add_argument("--disable-blink-features=AutomationControlled")

        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)

        search_url = f"https://www.google.com/search?q={quote_plus(query)}&tbm=nws"
        driver.get(search_url)

        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, '//a[@data-ved]'))
        )

        results = driver.find_elements(By.XPATH, '//a[@data-ved]')
        links = [unwrap_google_url(r.get_attribute("href")) for r in results if r.get_attribute("href") and "https" in r.get_attribute("href")]
        driver.quit()
        return links[:num_results]
    except Exception as e:
        print("Google scraping failed:", e)
        return []

def unwrap_google_url(google_url):
    parsed = urlparse(google_url)
    qs = parse_qs(parsed.query)
    if 'q' in qs:
        return qs['q'][0]
    return google_url

def extract_text_from_url(url):
    try:
        article = Article(url)
        article.download()
        article.parse()
        return f"{article.title}. {article.text}", url
    except:
        return "", url

def parse_llm_output(text):
    text = text.strip()
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    reasons = []
    for line in lines:
        if re.match(r"^[0-9]+\.", line):
            reasons.append(re.sub(r"^[0-9]+\.\s*", "", line))
    if "inconsistent" in text.lower():
        flag = "inconsistent"
    elif "partially consistent" in text.lower():
        flag = "partially-consistent"
    elif "consistent" in text.lower():
        flag = "consistent"
    else:
        flag = "unclear"
    return flag, reasons[:3]

def run_fake_news_detection(original_url, num_articles=5):
    ref_article = fetch_article_text(original_url)
    if not ref_article:
        return []

    original_text = f"{ref_article.title}. {ref_article.text}"
    query = " ".join(ref_article.title.split())

    related_links = google_news_urls_with_selenium(query, num_articles)
    if not related_links:
        return []

    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(extract_text_from_url, url): url for url in related_links}
        collected_data = []
        for future in as_completed(futures):
            text, source_url = future.result()
            if text.strip():
                collected_data.append({
                    "reference": text,
                    "original": original_text,
                    "source": source_url
                })

    if not collected_data:
        return []

    results = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        compare_jobs = {
            executor.submit(lambda d: (d["source"], chain.invoke(d)), data): data["source"]
            for data in collected_data
        }

        for future in as_completed(compare_jobs):
            source, result = future.result()
            raw_text = result.get("text", "").strip()
            flag, reasons = parse_llm_output(raw_text)

            results.append({
                "url": source,
                "flag": flag,
                "reasons": reasons
            })

    return results

@app.post("/detect", response_model=List[ComparisonResult])
async def detect_fake_news(data: URLRequest):
    results = run_fake_news_detection(str(data.url))
    if not results:
        raise HTTPException(status_code=404, detail="No comparison articles found.")
    return results
