import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)

  return (
       <div className="min-h-screen border-none shadow bg-white border-r ">
      {aToken && 
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-teal-400" : ""
              }`
            }
            to="/admin-dashboard"
          >
            <img className='w-8' src={assets.home} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-teal-400" : ""
              }`
            }
            to={"/all-booking"}
          >
            <img className='w-8' src={assets.calender} alt="" />
            <p className="hidden md:block">Penjadwalan</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-teal-400" : ""
              }`
            }
            to={"/list-lapangan"}
          >
            <img className='w-8' src={assets.field} alt="" />
            <p className="hidden md:block">Daftar Lapangan</p>
          </NavLink>
        </ul>
}
    </div>
  )
}

export default Sidebar
