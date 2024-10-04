import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to Logout");
    }
  };  


  return (
    <>
    <div className='w-[4%]  bg-slate-950 text-white flex flex-col justify-end'>
        
        <div className='px-3'>
            <form action=''>
                <div className='flex space-x-3'>
                    <button>
                    <BiLogOutCircle className='text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300'  onClick={handleLogout}/>
                    </button>
                </div>
            </form>

        </div>







    </div>
    </>
  )
}

export default Logout