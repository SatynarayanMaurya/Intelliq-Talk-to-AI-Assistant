


import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addMessage, setMessages } from "../redux/slices/historySlice";
import MessageItem from "../components/MessageItem";
import { apiConnector } from "../services/apiConnector";
import { askGeminiEndpoints, chatEndpoints } from "../services/apis";
import {CirclePause,Pause,Mic } from "lucide-react"


export default function NewChat() {

  const { id: chatId } = useParams(); 
  const navigate = useNavigate()
  const location = useLocation()
  const isCollapsed = useSelector((state)=>state.history.isCollapsed)
  const dispatch = useDispatch()
  const [inputText, setInputText] = useState("");
  const messageHistory = useSelector((state) => state.history.allMessages?.[chatId]) || [];
  const [isMicOpen, setIsMicOpen] = useState(false)

  const {initialMessage,file} = location?.state || {};
  const [selectedFile,setSelectedFile] = useState(null)
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageHistory]);

  const hasSentInitial = useRef(false);

  useEffect(() => {
    if (initialMessage && !hasSentInitial.current) {
      hasSentInitial.current = true; 
      const formPayload= new FormData();
      formPayload.append("prompt", initialMessage);
      formPayload.append("chatId", chatId);
      if (file) {
        formPayload.append("file", file);
      }


      dispatch(addMessage({ chatId, message: { role: "user", content: initialMessage,image: file ? URL.createObjectURL(file) : null,timestamp: Date.now(),  } }));
      dispatch(addMessage({ chatId, message: { role: "ai", content: "", loading: true,timestamp: Date.now(),  } }));

      (async () => {
        const response = await apiConnector("POST",askGeminiEndpoints.ASK_GEMINI,formPayload,{"Content-Type":"multipart/form-data"})

        dispatch(setMessages({
          chatId,
          messages: [
            { role: "user", content: initialMessage },
            { role: "ai", content: response?.data?.data, loading: false }
          ]
        }));
      })();

    }
  }, [initialMessage,file, chatId, dispatch]);


  

  const handleSubmit = async (e,overrideText) => {
    e.preventDefault();
    const finalText = overrideText ?? inputText;
    if (!finalText.trim() && !selectedFile) return;
    if(selectedFile?.name?.split(".")?.pop() === "pdf" ){
      alert("PDF File is not supported yet")
      return;
    }
    if(selectedFile?.name?.split(".")?.pop() === "mp4" ){
      alert("Video File is not supported yet")
      return;
    }

    const formPayload= new FormData();
    formPayload.append("prompt", finalText);
    formPayload.append("chatId", chatId);
    if (selectedFile) {
      formPayload.append("file", selectedFile);
    }

    

    // for (let [key, value] of formPayload.entries()) {
    //   console.log(key, value);
    // }

    setInputText("")
    dispatch(addMessage({chatId,message:{role:"user",content:finalText,image: selectedFile ? URL.createObjectURL(selectedFile) : null,timestamp:Date.now()}}))
    dispatch(addMessage({chatId,message:{role:"ai",content:"",loading:true,timestamp:Date.now()}}))
    const response = await apiConnector("POST",askGeminiEndpoints.ASK_GEMINI,formPayload,{"Content-Type": "multipart/form-data" })
    const updated = messageHistory
      .concat({
        role: "user",
        content: inputText,
        image: selectedFile ? URL.createObjectURL(selectedFile) : null,
      })
      .concat({ role: "ai", content: response?.data?.data, loading: false });


    dispatch(setMessages({ chatId, messages: updated }));
    setSelectedFile(null)

  };




  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    setIsMicOpen(true)

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputText(transcript);
      recognitionRef.current.finalTranscript = transcript;
    };

    
    recognitionRef.current.onspeechend = () => {
      setIsMicOpen(false)
      handleSubmit({preventDefault:()=>{}},recognitionRef.current.finalTranscript)
      recognitionRef.current.stop();
    };

    recognitionRef.current.onerror = (event) => {
      if (event.error === "network") {
        console.warn("Network error: Check internet or HTTPS setup.");
      } else {
        console.error("Speech recognition error:", event.error);
      }
      setIsMicOpen(false)
    };


    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsMicOpen(false)
  };


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
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {!localStorage.getItem("token") &&<button onClick={()=>navigate("/auth")} className="border border-gray-400 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium  cursor-pointer">Login</button>}
          <button onClick={()=>navigate(`/${crypto.randomUUID()}`)} className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700">
            + New Chat
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`pt-4 pb-12  ${isCollapsed ? "w-[90%] lg:w-[62%]":"w-[90%] lg:w-[71%]"} px-4 mx-auto h-[75vh] overflow-y-scroll`}>

        <div className="flex flex-col gap-4">

          {messageHistory?.map((msg, index) => (
            <MessageItem key={index} msg={msg} />
          ))}

          <div ref={messagesEndRef} />

        </div>
      </div>

      {/* Input Area */}
      <div className={`fixed bottom-0 ${isCollapsed?"left-[15vw] lg:left-[6vw]":"left-[32vw] lg:left-[18vw]"} right-0 bg-white border-t border-gray-200 px-4 py-4`}>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e)=>{if(e.key === "Enter"){handleSubmit(e)}}}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 pr-20 resize-none focus:outline-none focus:border-blue-500 focus:bg-white text-sm"
              rows={3}
              placeholder="Ask me anything..."
            />
            
            {/* Input Actions */}
            <div className={`absolute bottom-3  left-3 flex items-center space-x-2`}>
              <div className="text-gray-400 mr-3">
                {
                  !isMicOpen ?
                  <button onClick={startListening} className="hover:text-gray-600 cursor-pointer"><Mic  size={16}/></button>:
                  <button onClick={stopListening} className="hover:text-gray-600 cursor-pointer"><Pause size={15}/></button>
                }
              </div>
              <label htmlFor="fileUpload" className="cursor-pointer">
                  <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
              </label>
              <label htmlFor="fileUpload" className="cursor-pointer ml-2">
                  <svg
                    className="w-4 h-4 text-gray-400 hover:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
              </label>

              <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
              />
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



