
const BASE_URL = import.meta.env.VITE_BACKEND_URL
export const authEndpoints = {
    SIGN_UP:BASE_URL + "/auth/signup",
    LOGIN:BASE_URL + "/auth/login",
}

export const chatEndpoints ={
    GET_ALL_CHATS : BASE_URL+ "/get-all-chats",
    ADD_MESSAGE : BASE_URL+ "/add-message",
    DELETE_CHAT : BASE_URL+ "/delete-chat",

}

export const userEndpoints ={
    GET_USER_DETAILS : BASE_URL + "/get-user-details",
    UPDATE_PROFILE : BASE_URL + "/update-profile",
}


export const askGeminiEndpoints = {
    ASK_GEMINI : BASE_URL + "/ask-gemini"
}