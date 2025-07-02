<p align="center">
  <img src="https://res.cloudinary.com/dc23g63i8/image/upload/v1751011080/Logo_v5u2s6.png" alt="NoirSight Logo" width="200"/>
</p>

# 🕵️‍♂️ NoirSight — BaaS SDK for Deepfake Media & News Verification

> **Fight misinformation with one line of code.**  
> A plug-and-play API wrapper for detecting deepfakes and analyzing media/news authenticity.

---

## ⚙️ What is NoirSight?

**NoirSight** is a **Backend-as-a-Service (BaaS)** platform that helps you detect AI-generated fake images, deepfake videos, and misinformation in news content or public articles/opinions — using powerful vision and language models.

With this SDK, you can:

- Detect fake or manipulated images and videos
- Analyze news articles for factuality, bias, and context
- Receive confidence scores, reasons, and supporting citations
- Seamlessly integrate moderation into your platform

---

## 🧠 How It Works

### 📦 Installation

```bash
npm install noirsight
```

---

### 🖼 Deepfake Image Analyzer:

```ts
import { DeepfakeImageAnalyser } from 'noirsight'

const imageAnalyser = new DeepfakeImageAnalyser(
  process.env.NOIRSIGHT_API_KEY,
  process.env.NOIRSIGHT_USER_ID
)

const response = await imageAnalyser.analyseImage(imageUrl)
console.log(response)
```

#### ✅ Response:

```json
{
  "label": "real",
  "confidence": 0.92
}
```

---

### 🎥 Deepfake Video Analyzer

```ts
import { DeepfakeVideoAnalyser } from 'noirsight'

const videoAnalyser = new DeepfakeVideoAnalyser(
  process.env.NOIRSIGHT_API_KEY,
  process.env.NOIRSIGHT_USER_ID
)

const response = await videoAnalyser.analyseVideo(videoUrl)
console.log(response)
```

#### ✅ Response:

```json
{
  "label": "fake",
  "confidence": 0.87
}
```

---

### 📰 News Article Analyzer

```ts
import { ArticleAnalyser } from 'noirsight'

const articleAnalyzer = new ArticleAnalyser(
  process.env.NOIRSIGHT_API_KEY,
  process.env.NOIRSIGHT_USER_ID
)

const response = await articleAnalyzer.analyseArticle(text)
console.log(response)
```

#### ✅ Response:

```json
{
  "classification": "contextual",
  "reasons": [
    "The paragraph expresses an opinion about a world mourning in pain, which is subjective.",
    "The terms 'ViswaGuru' and 'Bootlickers' are used to describe individuals, indicating bias."
  ],
  "related_articles": [
    {
      "url": "https://example.com/article1",
      "verdict": "weakly relevant",
      "gemini_analysis": "This article confirms the event but does not support the user's political opinion."
    },
    {
      "url": "https://timesofindia.indiatimes.com/city/ahmedabad/ahmedabad-air-india-plane-crash-news-live-air-india-london-flight-crash-sardar-vallabhbhai-patel-international-airport-deaths-injured-rescue-operation-latest-updates/liveblog/121799226.cms",
      "verdict": "weakly relevant",
      "gemini_analysis": "The reference article discusses a plane crash in Ahmedabad involving an Air India flight. The user submission mentions a \"plane crash\" and uses hashtags related to political figures. While there's a keyword overlap (\"plane crash\"), the user's statement seems to be using the event to make a political point, whereas the article focuses on the details of the crash itself. The article provides factual information about the plane crash, including the flight details, timeline, and initial response. It does not mention anything about political figures, resignations, or the user's implied political commentary. Therefore, the article neither supports nor contradicts the user's claims; it simply ignores them. The article is primarily focused on reporting the event, not on any political ramifications."
    }
  ]
}
```

---

## 🔐 Authentication

To use this SDK, you'll need:

- A NoirSight **API Key**
- Your **User ID**

You can generate these from the [NoirSight Developer Portal](https://noirsight.ai).

---

## 🧩 Use Cases

- 🧵 Social media post moderation
- 🗞 Fake news detection in journalism platforms
- 🔐 Enterprise-level trust & safety filters
- 🧪 Research, education, and experiments

---

## 🌍 Why NoirSight?

- ✅ Accurate models (EfficientNet, Vision Transformer, Gemini-2.0-flash powered LLM Chains)
- 🚀 Easy to install and scale
- 🛠 Designed for developers and platform integrators
- 🌐 Open-source spirit + public API playground

---

## 👥 Community & Support

- 🧪 [Playground Studio](https://noirsight.ai/playground)
- 📖 [API Docs](https://noirsight.ai/docs)
- 🛠 [GitHub](https://github.com/SagnikBasak04/NoirSight-SkullCrushers)

---

## 📄 License

MIT License © 2025 NoirSight

```
