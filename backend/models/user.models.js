
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // for personalization
  },
  email: {
    type: String,
    required: true,
    unique: true,   // login identifier
  },
  password: {
    type: String,
    required: true, // hashed before saving
  },
  avatar: {
    type: String,   // optional profile picture
  }
  
},{timestamps:true});

export default mongoose.model("User",userSchema)
