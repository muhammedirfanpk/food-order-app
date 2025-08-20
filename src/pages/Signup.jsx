import React from 'react'
import { useState } from "react"
import { useDispatch, } from "react-redux"
import { signup } from "../features/authSlice"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Signup = () => {
   const [form, setForm] = useState({ name:"", email:"",password:"", role:"user"});
   const [errors , setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePassword = () => {
    setShowPassword(!showPassword);
  }
 

  const validate  = () => {
    const newErrors = {};

    if(!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 6) {
      newErrors.name = "Name must be at 6 characters"
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)){
      newErrors.email = "Email format is invalid"
    }

    if(!form.password.trim()){
      newErrors.password = "Password id required"
    } else if (!/^(?=(?:.*[A-Za-z]){4,})(?=(?:.*\d){4,})[A-Za-z\d]{8,16}$/.test(form.password)) {
      newErrors.password = "Password must be 8–16 characters, including at least 4 letters and 4 numbers";
    }
    return newErrors;

  };

   const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = validate();
    if(Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      
    dispatch(signup(form))
    navigate("/home")
    }

  }

  return (
    <div className='signup-bg  min-h-screen flex items-center justify-center px-3 bg-gray-900'>
      <form onSubmit={handleSubmit}
       className=' p-8 rounded-md  bg-gray-800  w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-2 text-center  text-yellow-500'>Register</h2>
        <p className='text-center mb-4 text-gray-400 mt-6'>Create your new account</p>

        <div className='relative w-full mb-4 min-h-[60px] '>
          <span className='absolute left-3 pb-5 top-1/2 transform -translate-y-1/2 text-yellow-400'>
            <FaUser /> 
          </span>
           <input 
        className='w-full pl-10  py-2 border-none rounded-md bg-yellow-100 focus:outline-none'
         type="text"  
         placeholder="User Name"
          onChange={(e) => setForm({...form, name:e.target.value})} />
          {errors.name && <p className='text-red-500 text-sm mb-2'>{errors.name}</p>}
        </div>
       
       <div className='relative w-full mb-4 min-h-[60px] '>
        <span className='absolute pb-5 left-3 top-1/2 transform -translate-y-1/2 text-yellow-400'><MdEmail /></span>
          <input 
        className='w-full pl-10  py-2 border-none rounded-md bg-yellow-100 focus:outline-none '
          placeholder="Email"
           onChange={(e) => setForm({...form,email:e.target.value})}  />
           {errors.email && <p className='text-red-500 text-sm mb-2'>{errors.email}</p>}
       </div>
       
       <div className='relative w-full mb-4 min-h-[60px] '>
        <span className='absolute left-3 top-1/2 pb-5 transform -translate-y-1/2 text-yellow-400'>
          <RiLockPasswordFill />
        </span>
         <input
         className='w-full pl-10  py-2 border-none rounded-md bg-yellow-100 focus:outline-none'
         type={showPassword ? "text" : "password"}
          placeholder="Password"
           onChange={(e) => setForm({...form,password:e.target.value})}  />
           <p onClick={handlePassword} className='absolute right-3 pb-5 top-1/2 transform -translate-y-1/2'> 
           { showPassword ? <FaEye /> : <FaRegEyeSlash />  }</p>
           {errors.password && <p className='text-red-500 text-sm mb-2 '>{errors.password}</p>}
       </div>
       
        <button className='w-full bg-yellow-400 text-white py-2 rounded-2xl hover:bg-yellow-500 transition duration-300 mt-2'
         type="submit">Sign up</button>

         <div className='mt-4 text-center '>
          <p className='text-sm text-gray-400'>Already have an account ? {""}
           <Link to="/" className='hover:text-blue-600 hover:underline' >
            Login
           </Link>
            </p>
         </div>

       

      </form>
    </div>
  )
}

export default Signup
