import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./slices/historySlice"
import { saveChatHistory } from "../utils/localStorage";

export const store = configureStore({
    reducer:{
        history:historySlice
    }
})

store.subscribe(() => {
  const state = store.getState().history;
  saveChatHistory(state.messageHistory); // save only chat history
});