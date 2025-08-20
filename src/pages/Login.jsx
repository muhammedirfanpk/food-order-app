import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../features/authSlice';
import { Link } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [form,setForm] = useState({email:"",password:""});
    const [showPassword, setShowPassword] = useState(false);
    const {user} = useSelector((state) => state.auth);
    const [errors , setErrors] = useState({})

    const handlePssword = () => {
        setShowPassword(!showPassword)
      }

    const handleLogin = (e) => {
      e.preventDefault();

      const errors = validateLogin(form);
      if(Object.keys(errors).length > 0){
        setErrors(errors);
        return;
      }

      const admin = JSON.parse(localStorage.getItem("admin"));
      if(admin && admin.email === form.email && admin.password === form.password) {
        dispatch(login(admin));
        navigate("/admin");
        
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || []
      const found = users.find(u => u.email === form.email && u.password === form.password);

      if(found) {
        dispatch(login(found));
        navigate("/home");
      } else {
        alert("Invalid credential");
      }
    }

    const validateLogin = (form)  => {
      const errors  = {}
      if(!form.email.trim()) {
        errors.email = "Email is required"
      } else if  (!/\S+@\S+\.\S+/.test(form.email)){
        errors.email = "Invalid email"
      }
      if (!form.password.trim()) {
        errors.password = "Password is required";
      } else if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      return errors;
    }

    

    useEffect (() => {
      if (user) {
       if( user.role == "admin") {
        navigate("/admin");
       } else {
        navigate("/home")
       }
      }
    },[user,navigate])
       

  return (
   <div className='min-h-screen flex items-center justify-center px-3 bg-gray-900'>
       <form className='p-8 rounded-md   w-full max-w-md bg-gray-800'>
        <h2 className='text-2xl font-bold mb-2 text-center text-yellow-500'>Login</h2>
        <p className='text-center text-gray-400 mb-6 text-sm'>Login to your Account</p>

        <div className='relative mb-4 min-h-[60px]'>
          <span className='absolute left-3 pb-5 top-1/2 transform -translate-y-1/2 text-yellow-400'>
            <MdEmail />
          </span>
           <input 
           value={form.email}
            placeholder='Email'
            onChange={(e) => setForm ({...form, email: e.target.value})} 
             className="w-full pl-10 border-none p-2  rounded-md focus:outline-none bg-yellow-100" />

        {errors.email && (<p className='text-red-500 textsm '>{errors.email}</p>)}

        </div>
       
       <div className="relative mb-4 min-h-[60px] ">
        <span className='absolute left-3 pb-5 top-1/2 transform -translate-y-1/2 text-yellow-400 '>
            <RiLockPasswordFill  />
        </span>
        <input type={showPassword ? "text" : "password"} 
        placeholder='password'
        value={form.password}
        onChange={(e) => setForm({...form,password:e.target.value})} 
        className='w-full border-none pl-10 py-2  rounded focus:outline-none bg-yellow-100 ' />

        <p onClick={handlePssword} className='absolute pb-5 right-3 top-1/2 transform -translate-y-1/2  text-gray-600  '>
        {showPassword ? <FaEye /> :  <FaRegEyeSlash /> }</p>

        {errors.password && (<p className='text-red-500 trxt-sm '>{errors.password}</p>)}
       </div>
        

        <button onClick={handleLogin}
        className='bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-2xl w-full'
        > Login</button>
     <div className='text-center mt-4'>
       <p className='text-sm text-gray-400'>Don't have an account ? {""}
        <Link to="/signup" className='hover:text-blue-600 hover:underline'> 
           Sign up 
       </Link> </p>
      
     </div>
       
    </form>
   </div>
  )
}

export default Login
