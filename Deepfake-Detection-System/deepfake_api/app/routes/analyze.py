import os
import re
from dotenv import load_dotenv
from urllib.parse import quote_plus, urlparse, parse_qs
from newspaper import Article
from concurrent.futures import ThreadPoolExecutor, as_completed

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables
load_dotenv()

# --- API Router ---
router = APIRouter()

# --- Input Schema ---
class ParagraphInput(BaseModel):
    text: str

# --- LangChain Gemini Setup ---
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.2,
    max_output_tokens=512
)

# --- Prompt Chains ---
classify_prompt = ChatPromptTemplate.from_template("""
You are an assistant that classifies a paragraph as either 'factual' (based on objective events or data)
or 'contextual' (based on opinions or interpretations).

PARAGRAPH:
\"\"\"{paragraph}\"\"\"

Respond in this format:
Classification: <factual/contextual>
1. <reason>
2. <reason>
""")
classify_chain = LLMChain(llm=llm, prompt=classify_prompt)

keyword_prompt = ChatPromptTemplate.from_template("""
Extract 5 to 7 single-word high-relevance keywords from this paragraph.

PARAGRAPH:
\"\"\"{paragraph}\"\"\"

Return a comma-separated list.
""")
keyword_chain = LLMChain(llm=llm, prompt=keyword_prompt)

comparison_prompt = ChatPromptTemplate.from_template("""
You are a media comparison assistant.

We have two texts:
- A user-submitted paragraph expressing opinions or claims.
- A reference article from the web, retrieved based on keyword overlap.

USER SUBMISSION:
\"\"\"{original}\"\"\"

REFERENCE ARTICLE FROM {source}:
\"\"\"{reference}\"\"\"

Your task is to:
1. Check if the reference article is topically relevant.
2. Analyze whether the article supports, contradicts, or ignores the paragraph’s claims.
3. If not relevant, explain why.

Then, give a final verdict:
- "strongly relevant and consistent"
- "strongly relevant but inconsistent"
- "weakly relevant"
- "not relevant"

Format:

Relevance Check: <...>
Analysis: <...>
Verdict: <...>
""")
compare_chain = LLMChain(llm=llm, prompt=comparison_prompt)

# --- Helper Functions ---
def unwrap_google_url(google_url):
    parsed = urlparse(google_url)
    qs = parse_qs(parsed.query)
    return qs.get('q', [google_url])[0]

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
        links = []
        seen = set()
        for r in results:
            href = r.get_attribute("href")
            if href and href.startswith("http"):
                clean = unwrap_google_url(href)
                if clean.startswith("http") and clean not in seen:
                    links.append(clean)
                    seen.add(clean)

        driver.quit()
        return links[:num_results]
    except Exception as e:
        return []

def extract(url):
    try:
        art = Article(url)
        art.download()
        art.parse()
        text = f"{art.title}. {art.text}"
        return text, url
    except:
        return "", url

def parse_llm_output(text):
    verdicts = ["strongly relevant and consistent", "strongly relevant but inconsistent", "weakly relevant", "not relevant"]
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    verdict = "unclear"
    for v in verdicts:
        if v in text.lower():
            verdict = v
            break
    return verdict, "\n".join(lines)

def run_comparison(article_text, source_url, paragraph):
    try:
        response = compare_chain.invoke({
            "original": paragraph,
            "reference": article_text,
            "source": source_url
        })
        text = response.get("text", "")
        verdict, full_text = parse_llm_output(text)
        return {
            "url": source_url,
            "verdict": verdict,
            "gemini_analysis": full_text
        }
    except Exception as e:
        return {
            "url": source_url,
            "verdict": "error",
            "gemini_analysis": f"Error occurred: {e}"
        }

# --- API Endpoint ---
@router.post("/analyze")
def analyze_paragraph(input_data: ParagraphInput):
    paragraph = input_data.text.strip()
    if not paragraph:
        raise HTTPException(status_code=400, detail="Empty paragraph provided.")

    # Classification
    cls_output = classify_chain.invoke({"paragraph": paragraph})["text"]
    classification = "unclear"
    reasons = []
    for line in cls_output.splitlines():
        if line.lower().startswith("classification"):
            classification = line.split(":")[-1].strip().lower()
        elif re.match(r"^[0-9]+\.", line.strip()):
            reasons.append(re.sub(r"^[0-9]+\.\s*", "", line.strip()))

    # Keywords
    keyword_response = keyword_chain.invoke({"paragraph": paragraph})["text"]
    keywords = [k.strip() for k in keyword_response.split(",") if k.strip()]
    query = " ".join(keywords)

    # News Search
    links = google_news_urls_with_selenium(query)
    if not links:
        return {
            "classification": classification,
            "reasons": reasons,
            "keywords": keywords,
            "related_articles": [],
            "message": "No related news articles found."
        }

    # Article Extraction
    with ThreadPoolExecutor(max_workers=5) as executor:
        article_futures = [executor.submit(extract, url) for url in links]
        articles = [f.result() for f in as_completed(article_futures)]

    # Comparison
    with ThreadPoolExecutor(max_workers=5) as executor:
        compare_futures = [executor.submit(run_comparison, a[0], a[1], paragraph) for a in articles if a[0]]
        results = [f.result() for f in as_completed(compare_futures)]

    return {
        "classification": classification,
        "reasons": reasons,
        "keywords": keywords,
        "related_articles": results
    }
