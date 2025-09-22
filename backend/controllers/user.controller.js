import mongoose from "mongoose";
import User from "../models/user.models.js"

export const getUserDetails = async(req,res)=>{
    try{

        const id = req?.user?.id;
        if(!id){
            return res.status(404).json({
                success:false,
                message:"Id not found"
            })
        }

        const userDetails = await User.findById(id).select("-password");

        return res.status(200).json({
            success:true,
            message:"User details fetched successfully",
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Server error"
        })
    }
}


export const updateProfile = async(req,res)=>{
    try{
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Please provide a name"
            })
        }

        if(req.user.id){
            await User.findByIdAndUpdate(req.user.id,{name})
            return res.status(200).json({
                success:true,
                message:"Profile updated"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Error in updating the profile"
        })
    }
}