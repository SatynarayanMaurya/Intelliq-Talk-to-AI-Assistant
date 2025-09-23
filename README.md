# Intelliq - Talk to AI Assistant  
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Gemini](https://img.shields.io/badge/AI-Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

Intelliq is an **AI-powered chatbot application** built with **React.js, Express.js, Node.js, and MongoDB**.  
It allows users to chat with an AI assistant (powered by **Google Gemini API**) using **text, voice, or even images**.  

## ✨ Features  

- 🔹 **AI Chatbot** – Works like ChatGPT, users can chat with the AI by typing or speaking.  
- 🔹 **Image Understanding** – Upload an image and ask the AI questions related to it.  
- 🔹 **Voice Input** – Integrated microphone support for hands-free AI interaction.  
- 🔹 **Authentication (Optional)** –  
  - Logged-in users: Chat history is stored persistently.  
  - Guest users: Temporary history (lost on refresh).  
- 🔹 **Chat History & Search** – Users can search previous chats by keywords.  
- 🔹 **Profile Management** – Update username and logout anytime.  
- 🔹 **Collapsible Sidebar** – Clean and minimal UI with sidebar navigation.  

## ⚙️ Tech Stack  

**Frontend:** React.js, TailwindCSS (if used)  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**AI Model:** Google Gemini API  


## 🚀 Getting Started  

### Prerequisites  
- Node.js   
- MongoDB  
- Gemini API key  ( gemini-2.5-flash )

### Installation  

1. Clone the repo  
   ```bash
   git clone https://github.com/SatynarayanMaurya/Intelliq-Talk-to-AI-Assistant.git
   cd Intelliq-Talk-to-AI-Assistant
   ```
2. Install dependencies
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables (.env) in the backend folder: 
   ```bash
   PORT = 4000
   FRONTEND_URL = "frontend url "
   DB_URL="database url "
   JWT_SECRET = "jwt secret"
   GEMINI_API_KEY = "api key here"
   ```
4. Set up environment variables (.env) in the frontend folder: 
   ```bash
   VITE_BACKEND_URL = "backend_url_here"
   ```
5. Set up environment variables (.env) in the frontend folder: 
   ```bash
   # Run frontend
   cd frontend
   npm run dev
  
   # Run backend
   cd ../backend
   npm run dev
   ```

 ## ⚠️ Limitations  

- ❌ Responses are displayed only after full generation (no streaming/chunks like ChatGPT).  
- ❌ Context is not maintained across chats (each query is treated independently).  
- ❌ Currently supports only text, voice, and image understanding, but not image generation.  

## 🔮 Future Enhancements  

- ✅ **Response Streaming** – Show answers chunk by chunk like ChatGPT.  
- ✅ **AI Image Generation** – Allow AI to generate new images from prompts.  
- ✅ **Better Context Handling** – Maintain multi-turn conversations like ChatGPT.  
- ✅ **More Authentication Options** – Google/GitHub OAuth login.  
- ✅ **UI Enhancements** – Dark mode, better mobile responsiveness.  


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

###  **Contributing Guidelines**  
Encourage open-source contribution:  
```markdown
## 🤝 Contributing  

Contributions are welcome!  
1. Fork the project  
2. Create your feature branch (`git checkout -b feature/my-feature`)  
3. Commit changes (`git commit -m 'Add new feature'`)  
4. Push to branch (`git push origin feature/my-feature`)  
5. Open a Pull Request  
```

## 📜 License  

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.  


