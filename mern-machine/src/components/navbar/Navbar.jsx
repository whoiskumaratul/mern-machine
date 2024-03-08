import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
  return (
    <div>
    <nav className="bg-[#167004] text-white list-none shadow-md  shadow-slate-600 rounded-md ml-4 mr-4 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              {/* <div className="hidden md:block"> */}
              <div className="">
                <div className=" flex items-baseline space-x-4">
                   <li className="text-white list-none   hover:text-[#FF6A00]  cursor-pointer  py-2 rounded-md text-sm font-bold" onClick={() => navigate("/")}>Home </li>
                   <li className="text-white list-none   hover:text-[#FF6A00]  cursor-pointer  py-2 rounded-md text-sm font-bold" onClick={() => navigate("/employeelist")}> Employee List </li>
                   <li className="text-white list-none  hover:text-[#FF6A00]  cursor-pointer  py-2 rounded-md text-sm font-bold" onClick={() => navigate("/login")}> Login </li>
          </div>
        </div>
        </div>
        </div>
        </div>
      </nav>
  
    </div>
  )
}

export default Navbar;