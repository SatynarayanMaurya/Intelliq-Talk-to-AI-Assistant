export const loadChatHistory = () => {
  try {
    const data = localStorage.getItem("messageHistory");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveChatHistory = (messageHistory) => {
  try {
    localStorage.setItem("messageHistory", JSON.stringify(messageHistory));
  } catch {}
};
