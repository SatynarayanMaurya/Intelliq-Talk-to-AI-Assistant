import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoading } from "../redux/slices/userSlice";
import { apiConnector } from "../services/apiConnector";
import { userEndpoints } from "../services/apis";

function UpdateProfile({closeModal}) {
  const userDetails = useSelector((state)=>state.user.userDetails)
  const dispatch = useDispatch();
  const [updatedName, setUpdatedName] = useState(userDetails?.name || "Lawrence Cruz");
  const token = localStorage.getItem("token")

  const handleSubmit = async(e) => {
    try{
      if(!token){
        toast.warn("You are not registered with us")
        closeModal();
        return;
      }
      if(updatedName === userDetails?.name){
        closeModal();
        return;
      }
      if(!updatedName?.trim()){
        toast.warn("Provide a name")
        return ;
      }
      dispatch(setLoading(true))
      const result = await apiConnector("PUT",userEndpoints.UPDATE_PROFILE,{name:updatedName})
      toast.success(result?.data?.message)
      dispatch(setLoading(false))
      closeModal()
    }
    catch(error){
      dispatch(setLoading(false))
      console.log("Error in updating the user details : ",error)
      toast.error(error?.response?.data?.message || error.message || "Error in updating the user details")
    }
    e.preventDefault();
    localStorage.setItem("name",updatedName)
    closeModal();
  };

  return (
    <div onClick={()=>closeModal()} className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center h-screen w-screen z-10">
      <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
