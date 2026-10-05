# AI-Powered Web Application: Content Summarizer 📝

This project is part of my Web Development Internship Task 3. It is a full-stack web application that takes long articles or text as input and uses the **Google Gemini AI API** to generate a concise summary.

## 🚀 Features
- **AI Integration:** Uses `@google/genai` to generate intelligent summaries.
- **Secure API Credentials:** The Google Gemini API key is securely stored in a `.env` file on the backend and is NEVER exposed to the frontend (Browser).
- **User-Friendly UI:** Clean, responsive interface built with HTML, CSS, and Vanilla JavaScript.
- **State Handling:** Includes proper loading states (spinners), error handling, and input validation for empty prompts.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **AI Model:** Google Gemini 1.5 Flash API
- **Packages:** `express`, `cors`, `dotenv`, `@google/genai`

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd ai_summarizer_app