
import { Search, Home, BookOpen, Clock, Compass, Plus, User, Zap,ChevronRight,ChevronLeft,Trash2  } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllMessage, clearChat, setIsCollapse } from "../redux/slices/historySlice";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import {toast} from "react-toastify"
import { setLoading } from "../redux/slices/userSlice";
import { apiConnector } from "../services/apiConnector";
import { chatEndpoints } from "../services/apis";

const Sidebar = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userDetails = useSelector((state)=>state.user.userDetails)
  const isCollapsed = useSelector((state)=>state.history.isCollapsed)
  const [selectedItem, setSelectedItem] = useState("home");
  const [chatHistory,setChatHistory] = useState([])
  const [isLogout,setIsLogout] = useState(false)

  const [searchChat , setSearchChat] = useState("")

  const navigationItems = [
    { id: "home", icon: Home, label: "Home", shortcut: "⌘H" },
    { id: "library", icon: BookOpen, label: "Library", shortcut: "⌘T" },
    { id: "history", icon: Clock, label: "History", shortcut: "⌘G" },
    { id: "explore", icon: Compass, label: "Explore", shortcut: "⌘L" }
  ];

  const allMessages = useSelector((state)=>state.history.allMessages)

  const filterHistory = () => {
    if (!searchChat?.trim()) return Object.entries(allMessages);

    return Object.entries(allMessages).filter(([_, content]) =>
      content.some((msg) =>
        msg.content.toLowerCase().includes(searchChat.toLowerCase())
      )
    );
  };


  useEffect(()=>{
    const response = filterHistory();
    setChatHistory(response?.reverse())

  },[searchChat,allMessages])

  const deleteChat = async(chatId)=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("PUT",chatEndpoints.DELETE_CHAT,{chatId})
      toast.success(result?.data?.message)
      dispatch(clearChat(chatId))
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error.message || "Error in deleting the chat")
      console.log("Error in deleting the chat : ",error)
    }
  }

  const [isProfileUpdate, setIsProfileUpdate] = useState(false)

  return (
    <div className={`w-full  bg-white border-r border-gray-200 h-screen flex flex-col `}>
      {/* Header */}
      <div className=" border-b border-gray-200 relative">
        <div className={`flex items-center ${isCollapsed && "justify-center"} gap-4 mb-4 relative p-4 `}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center ">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <span onClick={()=>navigate("/")} className={`font-bold text-lg text-gray-900 cursor-pointer ${isCollapsed && "hidden"}`}>Intelliq</span>
          {
            isCollapsed ?
            <p onClick={()=>dispatch(setIsCollapse(false))} className="absolute right-0 cursor-pointer"><ChevronRight/></p>:
            <p onClick={()=>dispatch(setIsCollapse(true))}  className="absolute right-0 cursor-pointer"><ChevronLeft/></p>
          }
        </div>
        
        {/* Search */}
        {
            !isCollapsed ?
            <div className={`relative px-4`}>
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 " />
                <input
                    type="text"
                    value={searchChat}
                    onChange={(e)=>setSearchChat(e.target.value)}
                    placeholder="Search for chats..."
                    className="w-full mx-auto pl-9 pr-3 py-2  bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
            </div>:
            <div className="flex items-center justify-center mb-2">

            <Search className=" text-gray-400 w-5 h-5  " />
            </div>
        }
      </div>

      {/* Navigation */}
      <div className="flex-1 ">
        <div className="p-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedItem === item.id;
            
            return (
              <button
                key={item.id}
                className={`w-full flex items-center ${isCollapsed ? "justify-center":"justify-between"} px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 ${
                  isSelected
                    ? "bg-blue-50 text-blue-700"
                    : "text-[#989898] hover:bg-gray-50"
                }`}
              >
                <div className={`flex items-center  gap-3 `}>
                  <IconComponent className="w-5 h-5 text-center mx-auto" />
                  {
                    !isCollapsed &&
                  <span className="text-[#575757]">{item.label}</span>
                  }
                </div>
                {
                    !isCollapsed &&
                    <span className="text-gray-400 text-xs">{item.shortcut}</span>
                }
              </button>
            );
          })}
        </div>

        {/* Recent Chats */}
        {
            !isCollapsed &&
       
            <div className="px-4 py-2 border-t border-gray-100 h-[33vh]  overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Chats</h3>
              <div className="space-y-1">

                {chatHistory?.length > 0 ?
                  chatHistory?.map(([ChatId, message]) => {
                    const firstMessage = message?.[1]?.content || "New Chat";
                    return (
                      <div
                        key={ChatId}
                        className="group flex items-center justify-between px-2 py-1.5 rounded hover:bg-gray-50 transition-colors"
                      >
                        {/* Chat button */}
                        <button
                          onClick={() => navigate(`/${ChatId}`)}
                          className="flex-1 text-left text-sm text-gray-600 truncate"
                        >
                          {firstMessage}
                        </button>

                        {/* Delete icon - visible on hover */}
                        <button
                          onClick={() => deleteChat(ChatId)} // replace with your delete logic
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  }):
                  <p className="text-gray-400 text-sm">No Record found</p>
                }
              </div>
              <button className="text-blue-600 text-sm hover:text-blue-700 mt-2">
                View all →
              </button>
            </div>
         }
      </div>

      {/* Try Pro Section */}
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-100`}>
        {!isCollapsed ? (
          <>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3 lg:block hidden">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm text-gray-900">Try Pro!</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                Upgrade for smarter AI and more...
              </p>
              <button className="w-full bg-blue-600 text-white text-xs font-medium py-1.5 rounded-md hover:bg-blue-700 transition-colors">
                Upgrade
              </button>
            </div>

            {/* User Profile */}
            <div onClick={()=>setIsProfileUpdate(true)} className="flex items-center gap-2 cursor-pointer relative">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 flex-1">{userDetails?.name|| "Lawrence Cruz"}</span>
              <button onClick={(e)=>{e.stopPropagation();setIsLogout(!isLogout)}} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
              {
                isLogout &&
                <div className="absolute -right-20 z-100 bottom-6 bg-red-500 text-white font-semibold border border-gray-300 px-4 py-2 rounded-lg ">
                  Logout
                </div>
              }
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            {/* Try Pro - collapsed */}
            <button className="w-10 h-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center group relative hover:from-blue-100 hover:to-purple-100 transition-colors">
              <Zap className="w-4 h-4 text-blue-600" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                Try Pro!
              </div>
            </button>
            
            {/* User Profile - collapsed */}
            <button onClick={()=>setIsProfileUpdate(true)} className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center group relative">
              <User className="w-4 h-4 text-gray-600" />
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {localStorage?.getItem("name") || "Lawrence Cruz"}
              </div>
            </button>
          </div>
        )}
      </div>

      {
        isProfileUpdate &&
        <UpdateProfile closeModal={()=>setIsProfileUpdate(false)}/>
      }
    </div>
  );
};

export default Sidebar;
