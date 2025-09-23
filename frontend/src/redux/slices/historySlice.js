
import { createSlice } from "@reduxjs/toolkit";
import { loadChatHistory } from "../../utils/localStorage";

const initialState = {
  isCollapsed: window.innerWidth < 768,
  messageHistory:{},

  allMessages : {}
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {

    setIsCollapse: (state, action) => {
      state.isCollapsed = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.allMessages[chatId]) {
        state.allMessages[chatId] = []; 
      }
      state.allMessages[chatId].push(message);
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.allMessages[chatId] = messages;
    },
    clearChat: (state, action) => {
      const chatId = action.payload;
      delete state.allMessages[chatId];
    },

    setMessageHistory:(state,action)=>{
      state.allMessages = action.payload
    },
    clearAllMessage :(state,action)=>{
      state.allMessages = {}
    }
  }
});

export const { setIsCollapse, addMessage, setMessages, clearChat,setMessageHistory ,clearAllMessage} =
  historySlice.actions;
export default historySlice.reducer;









// import { createSlice } from "@reduxjs/toolkit"


// const initialState = {
//     isCollapsed :false,
//     messageHistory:[]
// }


// const historySlice = createSlice({
//     name:"history",
//     initialState,
//     reducers:{
//         setIsCollapse:(state,action)=>{
//             state.isCollapsed = action.payload
//         },
//         setMessageHistory :(state,action)=>{
//             state.messageHistory= action.payload;
//         },
//         clearMessageHistory:(state,action)=>{
//             state.messageHistory = null
//         }
//     }
// })

// export const {setIsCollapse,setMessageHistory,clearMessageHistory} = historySlice.actions
// export default historySlice.reducer