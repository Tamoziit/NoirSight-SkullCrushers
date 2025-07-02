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

- Detect fake or manipulated images and videos & annotate them with authenticity flags.
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

const imageUrl =
  'https://res.cloudinary.com/dhjyjsyvt/image/upload/v1750509275/utxp1rcvcktqxkkelzcr.jpg'

const imageAnalyser = new DeepfakeImageAnalyser(
  process.env.NOIRSIGHT_API_KEY,
  process.env.NOIRSIGHT_USER_ID
) // Initialize Image Analyzer Class

const response = await imageAnalyser.analyseImage(imageUrl)
// Handle the response below:
console.log(response)
```

#### ✅ Response:

```json
{
    "label": "real" | "fake",
    "confidence": 0.92,
    "annotedUrl": "https://res.cloudinary.com/dhjyjsyvt/image/upload/l_text:Arial_22_bold:FAKE,co_rgb:FFFFFF,b_rgb:FF0000,g_north_east,x_15,y_15,o_100/v1750509275/utxp1rcvcktqxkkelzcr.jpg"
}
```

---

### 🎥 Deepfake Video Analyzer

```ts
import { DeepfakeVideoAnalyser } from 'noirsight'

const videoUrl =
  'https://res.cloudinary.com/dhjyjsyvt/video/upload/v1743538578/q85tgnln6jig3pwbez78.mp4'

const videoAnalyser = new DeepfakeVideoAnalyser(
  process.env.NOIRSIGHT_API_KEY,
  process.env.NOIRSIGHT_USER_ID
) // Initialize Video Analyzer Class

const response = await videoAnalyser.analyseVideo(videoUrl)
// Handle the response below:
console.log(response)
```

#### ✅ Response:

```json
{
    "label": "real" | "fake",
    "confidence": 0.92,
    "annotedUrl": "https://res.cloudinary.com/dhjyjsyvt/video/upload/l_text:Arial_22_bold:FAKE,co_rgb:FFFFFF,b_rgb:FF0000,g_north_east,x_15,y_15,o_100/v1743538578/q85tgnln6jig3pwbez78.mp4"
}
```

---

### 📰 News Article Analyzer

```ts
import { ArticleAnalyser } from "noirsight"

const text = "USA strikes Iran, but played \"The Good Kid\" in India's case. Ironic!";

const articleAnalyzer = new ArticleAnalyser(
    process.env.NOIRSIGHT_API_KEY
    process.env.NOIRSIGHT_USER_ID
); // Initialize Article Analyzer Class

const response = await articleAnalyzer.analyseArticle(text)
// Handle the response below:
console.log(response);
```

#### ✅ Response:

```json
{
  "classification": "contextual",
  "reasons": [
    "The statement \"USA strikes Iran\" could be factual, but without context or evidence, it's difficult to verify.",
    "The phrase \"played 'The Good Kid' in India's case\" is an interpretation of US foreign policy, not a statement of objective fact.",
    "The word \"Ironic!\" expresses an opinion about the perceived contradiction in US actions."
  ],
  "related_articles": [
    {
      "url": "https://www.indiatoday.in/world/story/trump-trashes-reports-of-30-billion-nuclear-deal-for-iran-ridiculous-idea-2747498-2025-06-28",
      "verdict": "weakly relevant",
      "gemini_analysis": "Relevance Check: The article discusses US-Iran relations, potential nuclear deals, and military actions between the US, Iran, and Israel. This aligns with the user's statement about US strikes on Iran and perceived differences in US foreign policy.\nAnalysis: The article confirms US strikes on Iranian nuclear sites and mentions tensions between the US and Iran. It also discusses the US's stated goal of preventing Iran from developing nuclear weapons. However, the article doesn't directly address the user's claim about the US playing \"The Good Kid\" in India's case, nor does it offer any information to support or contradict this specific comparison. The article focuses on the US-Iran conflict and nuclear program concerns.\nVerdict: weakly relevant"
    },
    {
      "url": "https://indianexpress.com/article/world/iran-israel-war-live-updates-nuclear-sites-bombs-us-donald-trump-10080761/",
      "verdict": "strongly relevant but inconsistent",
      "gemini_analysis": "Relevance Check: The article is highly relevant. It directly discusses a US strike on Iran, which is the central claim of the user's paragraph.\nAnalysis: The article confirms the US strike on Iran. However, it doesn't mention anything about the US playing \"The Good Kid\" in India's case, nor does it address the user's implied irony. The article focuses on international reactions to the strike.\nVerdict: strongly relevant but inconsistent"
    },
    {
      "url": "https://timesofindia.indiatimes.com/world/us/30bn-for-iran-never-heard-of-this-ridiculous-idea-says-trump-dismisses-report-calls-it-a-hoax/articleshow/122125721.cms",
      "verdict": "not relevant",
      "gemini_analysis": "Relevance Check: The reference article discusses Donald Trump's denial of a report about a potential $30 billion deal to aid Iran's civil nuclear program. While it mentions Iran, it doesn't directly address any military strikes by the USA against Iran or any comparison to the USA's actions regarding India.\nAnalysis: The user's statement claims the USA struck Iran and acted differently towards India. The reference article only addresses a potential financial deal with Iran and doesn't mention any military action or comparison with India. Therefore, the article neither supports nor contradicts the user's claim. It ignores the core assertions about a US strike and differential treatment.\nVerdict: not relevant"
    },
    {
      "url": "https://theprint.in/opinion/us-iran-nuclear-strikes-india-diplomatic-space/2666673/",
      "verdict": "strongly relevant but inconsistent",
      "gemini_analysis": "Relevance Check: The article is highly relevant. It discusses the US-Iran situation and its implications for India, which aligns with the user's statement about the US, Iran, and India.\nAnalysis: The user's statement claims the US \"struck Iran\" and acted as \"The Good Kid\" in India's case, implying a double standard. The article confirms the US strike on Iran. It also suggests that the US's actions, while seemingly detrimental to India in the short term (Trump's rhetoric favoring Pakistan), might inadvertently benefit India by allowing it to maintain a safe distance from the conflict and avoid being associated with the US's actions against Iran. The article doesn't directly address the \"Good Kid\" aspect but implies that the US's relationship with Pakistan was driven by strategic interests related to Iran, not necessarily a genuine desire to help India. The article provides context for the US's actions and their potential consequences for India, which can be interpreted as both supporting and contradicting the user's statement depending on the interpretation of \"The Good Kid\".\nVerdict: strongly relevant but inconsistent"
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
