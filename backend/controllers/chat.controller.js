import Chat from "../models/chat.model.js";
import fs from "fs"

// export const addMessage = async (chatId,role,content) => {
//   try {
//     const userId = req.user.id; // comes from JWT middleware
//     // const { chatId, role, content } = req.body;

//     if (!role || !content) {
//       return res.status(400).json({ message: "role and content are required" });
//     }

//     if(!userId){
//       return res.status(404).json({
//         success:false,
//         message:"User id not found"
//       })
//     }

//     let chat;

//     if (chatId) {
//       // Case 1: Add message to existing chat
//       chat = await Chat.findById(chatId);

//       if (!chat) {
//         return res.status(404).json({ message: "Chat not found" });
//       }

//       // Ensure chat belongs to the logged-in user
//       if (chat.userId.toString() !== userId) {
//         return res.status(403).json({ message: "Not authorized" });
//       }

//       chat.messages.push({ role, content });
//       await chat.save();
//     } else {
//       // Case 2: Create a new chat with first message
//       chat = await Chat.create({
//         userId,
//         messages: [{ role, content }],
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       chat,
//     });
//   } catch (error) {
//     console.error("Error adding message:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


export const addMessage = async (userId,chatId,role,content) => {
  try {

    if (!chatId || !role || !content) {
      return res.status(400).json({ message: "chatId, role, and content required" });
    }

    let userChat = await Chat.findOne({ userId });

    if (!userChat) {
      // Create new doc for user if not exists
      userChat = new Chat({ userId, chats: {} });
    }

    if (!userChat.chats.has(chatId)) {
      userChat.chats.set(chatId, []);
    }

    // Push new message
    userChat.chats.get(chatId).push({ role, content });

    await userChat.save();

  } catch (error) {
    console.error("Error adding message:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getAllChats = async (req, res) => {
  try {
    const userId = req?.user?.id; // from auth middleware
    if(!userId){
      return res.status(404).json({
        success:false,
        message:"User id not founde"
      })
    }

    const chats = await Chat.findOne({ userId })
      .sort({ updatedAt: -1 }) // latest chats first
      .select("-__v"); // remove mongoose version field

    return res.status(200).json({
      success: true,
      count: chats.length,
      chats,
    });
  } catch (error) {
    console.error("Get chats error:", error);
    return res.status(500).json({ message: error.message||"Server error" });
  }
};




// export async function askGemini(req,res) {
//   const {prompt,chatId} = req.body;
//   const file = req.files.file
//   let parts = [{ text: prompt }];

//   if (file) {
//     // Convert file to Base64
//     const base64 = await fileToBase64(file);

//     parts.push({
//       inline_data: {
//         mime_type: file.type,  // e.g. "image/png" or "application/pdf"
//         data: base64.split(",")[1],
//       },
//     });
//   }

//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts }],
//       }),
//     }
//   );

//   const data = await response.json();
//   if(req?.user?.id){
//     await addMessage(req.user.id,chatId,"user",prompt)
//     await addMessage(req.user.id,chatId,"ai",data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model.")
//   }
//     return res.status(200).json({
//     success:true,
//     message:"Responce fetched",
//     data:data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model."
//   })
// }

// Helper to convert File → Base64



export async function askGemini(req, res) {
  try {
    const { prompt, chatId } = req.body;
    const file = req?.files?.file;

    let parts = [{ text: prompt }];
    let base64 = "";

    if (file) {
      if (file.data && file.data.length > 0) {
        base64 = file.data.toString("base64");
      } else if (file.tempFilePath) {
        const fileBuffer = fs.readFileSync(file.tempFilePath);
        base64 = fileBuffer.toString("base64");
      }

      parts.push({
        inline_data: {
          mime_type: file.mimetype,
          data: base64,
        },
      });
    }

    

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
        }),
      }
    );

    const data = await response.json();

    if (req?.user?.id) {
      await addMessage(req.user.id, chatId, "user", prompt);
      await addMessage(
        req.user.id,
        chatId,
        "ai",
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from model."
      );
    }

    return res.status(200).json({
      success: true,
      message: "Response fetched",
      data:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response from model.",
    });
  } catch (error) {
    console.error("Error in askGemini:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing request",
      error: error.message,
    });
  }
}


export const deleteChat = async(req,res)=>{
  try{
    const {chatId} = req.body;
    if(!chatId){
      return res.status(404).json({
        success:false,
        message:"Chat id not found"
      })
    }

    const userId = req.user.id;
    if(!userId){
      return res.status(401).json({
        success:false,
        message:"User is not logged in"
      })
    }

    await Chat.updateOne(
      { userId },
      { $unset: { [`chats.${chatId}`]: "" } }
    );

    return res.status(200).json({
      success:true,
      message:"Chat deleted"
    })


  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message||"Server Error"
    })
  }
}








