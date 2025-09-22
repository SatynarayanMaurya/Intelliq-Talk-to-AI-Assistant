


import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DefaultPage() {
  const isCollapsed = useSelector((state)=>state.history.isCollapsed)
    const navigate = useNavigate()
  const [inputText, setInputText] = useState("");
  const [selectedFile,setSelectedFile] = useState(null)
  const userDetails = useSelector((state)=>state.user.userDetails)

  const suggestionCards = [
    {
      icon: "✨",
      title: "Tell me 5 amazing facts about the human brain"
    },
    {
      icon: "✨", 
      title: "Give me tips to improve my time management"
    },
    {
      icon: "✨",
      title: "Generate 5 startup ideas in the eLearning industry"
    },
    {
      icon: "✨",
      title: "Give me a 5-minute morning workout plan"
    },
    {
      icon: "✨",
      title: "How to stay consistent while learning a new skill?"
    },
    {
      icon: "✨",
      title: "Write a funny shayri about my best friend in hindi"
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!inputText?.trim() && !selectedFile){
      return ;
    }

    navigate(`/${generateId()}`, {
      state: {
        initialMessage: inputText,
        file: selectedFile,  // send file object here
      },
    });
  };


  const cardClick = (msg)=>{
    navigate(`/${generateId()}`, { state: { initialMessage: msg } })
  }

  const generateId = ()=>{
      return  crypto.randomUUID();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-600">⚡</span>
          </div>
          <span className="text-sm text-gray-700">Chat gpt 4</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 md:block hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600  md:block hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {!localStorage.getItem("token") &&<button onClick={()=>navigate("/auth")} className="border border-gray-400 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium  cursor-pointer">Login</button>}
          <button onClick={()=>navigate(`/${generateId()}`)} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700">
            + New Chat
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div  className={`pt-4 pb-12 ${isCollapsed ? "w-[90%] lg:w-[62%]":"w-[90%] lg:w-[71%]"}  mx-auto flex-1 flex flex-col items-center justify-center`}>
        <div className="max-w-4xl w-full  mb-12">
          {/* Greeting */}
          <div className="mb-4  flex gap-2 items-center">
            <span className="text-2xl">👋</span>
            <h1 className="text-xl font-bold text-gray-800 mt-2">Hi {userDetails?.name || "Laurence!"}</h1>
          </div>
          
          {/* Main Question */}
          <h2 className="text-3xl font-medium text-gray-800 lg:mb-12 mb-4 leading-tight">
            What do you want to<br />learn today?
          </h2>
          
          {/* Suggestion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 lg:mb-12">
            {suggestionCards.map((card, index) => (
              <div
                key={index}
                onClick={()=>cardClick(card.title)}
                className="bg-gradient-to-r from-[#F8F9FC] via-[#FFDDF8]/30 to-[#D9E4FF]/40 border border-gray-200 rounded-lg lg:p-6 p-4 text-left hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="text-blue-500 text-lg lg:mb-5">{card.icon}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className={`fixed bottom-0 ${isCollapsed ? "left-[15vw] lg:left-[6vw]":"left-[32vw] lg:left-[18vw]"} right-0 bg-white border-t border-gray-200 px-4 py-4`}>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e)=>{if(e.key==="Enter") handleSubmit(e)}}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-20 resize-none focus:outline-none focus:border-blue-500 focus:bg-white text-sm"
              rows={3}
              placeholder="Ask me anything..."
            />
            
            {/* Input Actions */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-2">
              <label htmlFor="fileUpload" className="cursor-pointer">
                <svg className="w-4 h-4  text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>

              </label>
              <input type="file" name="" id="fileUpload" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={(e)=>setSelectedFile(e.target.files[0])} />
              <label htmlFor="fileUpload" className="cursor-pointer ml-2">
                <svg className="w-4 h-4  text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>

              </label>
              {
                selectedFile && 
                <p className="text-sm text-gray-500 ml-4">{selectedFile?.name?.slice(0,40)}</p>
              }
            </div>
            
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <span className="text-xs text-gray-400">{inputText?.length}/1000</span>
              <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}