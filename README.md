## 📰 Factify - Real-time News & Claim Verification Platform

🔗 **Live Preview**: [https://factify-sgu.vercel.app/](https://factify-sgu.vercel.app/)

---

### 🔍 Overview

- **Factify** is a real-time fake news and claim verification platform focused on Indian and global news.
- Users can input a **claim or URL**, and the app provides a **verdict** on its authenticity using **AI models** and **live web searches**.
- Designed to **combat misinformation** by providing clear, unbiased, and evidence-backed summaries and verdicts.

---

### ⚙️ Workflow

- User inputs either a **text claim** or **news URL**.
- Factify intelligently extracts the **claim** or **headline** (if URL).
- Passes the claim and gathered evidence to **DeepSeek V3** or **Mixtral AI** for verification and explanation.
- Displays:
  - ✅ Verdict (Likely True, Likely False, Unclear)
  - 📊 Confidence Score
  - 🧠 AI Explanation
  - 📰 Related Articles
  - 🧭 Bias Meter (for political content)

---

### 🤖 AI & API Usage

- **DeepSeek V3 (via OpenRouter)**:
  - Main LLM for **analyzing evidence** and generating fact-checking verdicts + explanations.
- **Mixtral** (fallback AI model):
  - Provides analysis if DeepSeek fails or gives unclear result.
- **NewsAPI**:
  - Fetches **real-time news articles** from trusted media outlets for contextual verification.
- **LinkPreview & CORS Scraper**:
  - Extract **headline, metadata, and article content** from news URLs.

---

### 🛠️ Technologies Used

- **Frontend**:
  - React.js + TailwindCSS
  - Lucide Icons
- **Backend**:
  - Node.js + Express.js
  - API integration with SerpAPI, NewsAPI, DeepSeek, OpenRouter, LinkPreview
- **AI Models**:
  - DeepSeek V3 (primary)
  - Mixtral (fallback)
- **Deployment**:
  - Frontend: **Vercel**

---

### ✅ Advantages

- **Real-time** verification with updated, live news context.
- **Multiple AI models** ensure accurate fallback logic and better reliability.
- Handles both **text-based claims and news URLs** effectively.
- Provides a **bias meter** for political content to help judge neutrality.
- Clean and modern **UI/UX** for quick and easy fact-checking.

---

### 🧠 Use Cases

- **Journalists** verifying claims before publishing.
- **Students or researchers** needing trustworthy summaries.
- **Everyday users** checking viral social media content.
- **Activists** verifying politically charged claims.
- **Educators** demonstrating misinformation analysis.

---

### 🚀 Future Scope

- 🔄 **User feedback & voting system** for verdict accuracy.
- 🗳️ Political bias detection through sentiment & source analysis.
- 🔗 Support for **YouTube, Twitter, and WhatsApp forwards**.
- 🌐 Multilingual claim verification (Hindi, Bengali, etc.).
- 📱 Mobile app version for Android & iOS.
- 📈 Dashboard to show **fake news trends**, source credibility ranking, etc.
