import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiConnector } from "../services/apiConnector";
import { authEndpoints } from "../services/apis";
import {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserDetails } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.user.userDetails)
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        let result ;
        if(!formData.email || !formData.password){
            toast.error("Fill all the field first")
            return ;
        }
        if(isLogin){
                dispatch(setLoading(true))
                result = await apiConnector("POST",authEndpoints.LOGIN,formData);
                dispatch(setLoading(false))
                toast.success(result?.data?.message)
                localStorage.setItem("token",result?.data?.token)
                dispatch(setUserDetails(result?.data?.userDetails))
                navigate("/")
            }
            else{
                if(!formData.name){
                    toast.error("Please provide a name")
                    return ;
                }
                dispatch(setLoading(true))
                result = await apiConnector("POST",authEndpoints.SIGN_UP,formData);
                dispatch(setLoading(false))
                toast.success(result?.data?.message)
                setIsLogin(true)

            }
        
        
        } 
        catch (error) {
            console.log(
                error?.response?.data?.message || error?.message || "Error in submit the form "
            );
            dispatch(setLoading(false))
            toast.error(error?.response?.data?.message || error?.message || "Error in submit the form ")
        }
    };

  if(loading){
    return <Spinner/>
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        isLogin
          ? "bg-gradient-to-r from-[#fdddf7]  to-[#eedff9]"
          : "bg-gradient-to-r from-[#dbffea]  to-[#c5d9e8]"
      }`}
    >
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none  focus:border-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-purple-600 cursor-pointer text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                >
                  Login
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl focus:border-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl focus:border-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  className="w-full px-4 py-2 border rounded-xl focus:border-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
                >
                  Sign Up
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;