

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "ai"],
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const userChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one document per user
  },
  chats: {
    type: Map,
    of: [messageSchema], // key = chatId, value = array of messages
    default: {},
  },
});

export default mongoose.model("Chat", userChatSchema);




// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//   role: {
//     type: String,
//     enum: ["user", "ai"], // who sent the message
//     required: true,
//   },
//   content: {
//     type: String, // text of the message
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const chatSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // links chat to a specific user
//     required: true,
//   },
//   title: {
//     type: String,
//     default: "New Chat", // optional, to name chats like in ChatGPT
//   },
//   messages: [messageSchema], // array of messages (conversation)
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // auto update "updatedAt" when a message is added
// chatSchema.pre("save", function (next) {
//   this.updatedAt = new Date();
//   next();
// });

// export default mongoose.model("Chat", chatSchema);
