
import { createSlice } from "@reduxjs/toolkit";
import { loadChatHistory } from "../../utils/localStorage";

const initialState = {
  isCollapsed: window.innerWidth < 768,
  messageHistory:loadChatHistory() // store chats as { chatId: [messages] }
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
      if (!state.messageHistory[chatId]) {
        state.messageHistory[chatId] = []; 
      }
      state.messageHistory[chatId].push(message);
    },
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messageHistory[chatId] = messages;
    },
    clearChat: (state, action) => {
      const chatId = action.payload;
      delete state.messageHistory[chatId];
    },
  }
});

export const { setIsCollapse, addMessage, setMessages, clearChat } =
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