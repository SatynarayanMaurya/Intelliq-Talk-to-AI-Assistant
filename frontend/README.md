# 🌟 Intelliq AI — Your Intelligent AI Chat & Image Assistant

Intelliq AI is a **ChatGPT-like AI assistant** built with modern web technologies.  
It allows users to chat with an AI model, ask questions, and even upload images to get intelligent responses — all **without requiring any signup or backend**.  

Powered by **Google Gemini 2.5 Flash**, Intelliq AI provides **fast, real-time streaming responses**, giving users a smooth and interactive AI experience.

---

## ✨ Features

- 💬 **ChatGPT-like Conversations** – Enter prompts and receive intelligent answers instantly.
- 🖼 **Image Upload Support** – Upload an image along with your question for enhanced responses.
- ⚡ **Powered by Gemini 2.5 Flash** – Leverages Google’s latest **Gemini API** for **fast & reliable** answers.
- 🕒 **Streaming Responses** – Watch the AI respond live as text is generated (like ChatGPT).
- 👤 **Customizable Username** – Users can set their name, stored locally for a personal experience.
- 💾 **Local Storage Persistence** – Chat history and username are stored in your browser’s local storage.  
  - No backend  
  - No database  
  - 100% privacy-friendly
- 🚀 **Instant Access** – No authentication required. Open the app and start chatting immediately.

---

## 🛠 Tech Stack

- **Frontend Framework**: React + Vite  
- **Styling**: Tailwind CSS  
- **AI API**: [Google Gemini API (gemini-2.5-flash)](https://ai.google.dev/)  
- **State Management**: Redux Toolkit  
- **Markdown Rendering**: React Markdown + Remark GFM  
- **Storage**: Local Storage (browser-side only)

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/SatynarayanMaurya/Intelliq-AI.git
cd Intelliq-AI
npm install
```


## 🚀 Usage

### 1. Create a .env file in the root and add your Gemini API key:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

### 2. Start the development server:

```bash
npm run dev
```

## 🖼️ Screenshots

### Home Page
![Sign In Screenshot](https://drive.google.com/uc?export=view&id=1lyuNljWFMh9n9943cduV6Nc8TprDk3ct)


### Collapible Side bar
![Dashboard Screenshot](https://drive.google.com/uc?export=view&id=1y15ujauoNLdkdy-4mIGVcmuK5DmE0iCc)

### Chat Page
![Schedules Screenshot](https://drive.google.com/uc?export=view&id=1yNtWGb9QDFQVB6UZQzbWZbBRyHQrQl5n)

### Upload Image
![Users Screenshot](https://drive.google.com/uc?export=view&id=1zqF7sP3vS2-_Nn2ozFyFTJ2i5UGZIGHh)

### Update Profile
![Settings Screenshot](https://drive.google.com/uc?export=view&id=13-FsDaZEXL6yU5jYuCeX2n6X7zNzepXs)

---
---

## 🔒 Privacy & Data

No server or backend is involved.

All chat history and username data are stored only in your browser’s local storage.

You can clear your history anytime by clearing local storage.

## 🌱 Future Improvements

- 🔐 Optional authentication (for multi-device sync)
- 📂 Support for more file types (PDF, video, etc.)
- 🌍 Multi-language support
- 🎨 Dark mode / theme customization
- 🤖 More AI model integrations

## 🙌 Contributing

Contributions are welcome! If you'd like to improve Intelliq AI, feel free to fork the repo and submit a pull request.

## 📜 License

This project is licensed under the MIT License.

## 💡 Inspiration

The project was inspired by ChatGPT-like AI assistants.  
Our goal was to create a lightweight, fast, and privacy-friendly AI chat app using the latest Gemini API, without relying on any backend or complex infrastructure.
