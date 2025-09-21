import Sidebar  from '../components/Sidebar'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function HomePage() {
    // const [isCollapsed,setIsCollapsed] = useState(false)
    const isCollapsed = useSelector((state)=>state.history.isCollapsed)
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
