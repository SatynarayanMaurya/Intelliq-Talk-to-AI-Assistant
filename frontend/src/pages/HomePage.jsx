import Sidebar  from '../components/Sidebar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { setIsLogin, setLoading, setUserDetails } from '../redux/slices/userSlice'
import { apiConnector } from '../services/apiConnector'
import { chatEndpoints, userEndpoints } from '../services/apis'
import {toast} from "react-toastify"
import { setMessageHistory } from '../redux/slices/historySlice'

function HomePage() {
  const isCollapsed = useSelector((state)=>state.history.isCollapsed)
  const token = localStorage.getItem("token")
  const isLogin = useSelector((state)=>state.user.isLogin)
  const dispatch = useDispatch();
  const userDetails = useSelector((state)=>state.user.userDetails)
  // const messageHistory = useSelector((state)=>state.user.messageHistory)
  const allMessages = useSelector((state)=>state.user.allMessages)
  const loading = useSelector((state)=>state.user.loading)
  const getUserDetails = async()=>{
    try{
      if(!token){
        return ;
      }
      if(userDetails  ) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET",userEndpoints.GET_USER_DETAILS)
      dispatch(setUserDetails(result?.data?.userDetails))
      dispatch(setIsLogin(true))
      dispatch(setLoading(false))
    }
    catch (error) {
      dispatch(setLoading(false))
      console.log("Error in  getting user details : ",error)
      toast.error(error?.response?.data?.message || error?.message || "Error in getting the user details")
    }
  }
  
  useEffect(()=>{
    getUserDetails();
  },[])
  
  
  const getChatHistory = async()=>{
    try{
      if(!token){
        return ;
      }
      if(allMessages ) return ;
      dispatch(setLoading(true))
      const result = await apiConnector("GET",chatEndpoints.GET_ALL_CHATS)
      dispatch(setMessageHistory(result?.data?.chats?.chats))
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error?.message || "Error in getting the chat history ")
      console.log("Error in getting the chat History : ",error)
    }
  }

  useEffect(()=>{
    getChatHistory()
  },[])



  if(loading){
    return <Spinner/>
  }
  
  return (
    <div className='flex justify-between h-screen'>

        <div className={`${isCollapsed ? " w-[15vw] lg:w-[6vw]":"w-[32vw] lg:w-[18vw]"}  `}>
            <Sidebar />
        </div>

        <div className={`${isCollapsed ? "w-[85vw] lg:w-[94vw]":"w-[68vw] lg:w-[82vw]"}  `}>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default HomePage
