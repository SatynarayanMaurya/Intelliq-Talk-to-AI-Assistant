import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./slices/historySlice"
import { saveChatHistory } from "../utils/localStorage";
import userSlice from "./slices/userSlice"

export const store = configureStore({
    reducer:{
        history:historySlice,
        user:userSlice
    }
})

// store.subscribe(() => {
//   const state = store.getState().history;
//   saveChatHistory(state.messageHistory); // save only chat history
// });