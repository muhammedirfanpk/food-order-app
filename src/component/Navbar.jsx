import {Link, useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router';
import { useState,useEffect } from "react"
import { IoIosCart } from "react-icons/io";
import { useSelector , useDispatch} from 'react-redux';
import { IoMdMenu } from "react-icons/io";
import {logout} from '../features/authSlice'
import { clearCart } from '../features/CartSlice';
import { setSearchTerm } from '../features/productsSlice';
import './Navbar.css'
import { FaUser } from "react-icons/fa";




const Navbar = () => {
  const [isOpenMenu,setIsOpenMenu] = useState(false);
  
   const cartItems = useSelector((state) => state.cart.cartItems);
   const cartCount = cartItems.length;
   const {user} = useSelector((state) => state.auth)
  

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   
 
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()) 
  }

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  }


 useEffect (() => {
  if(user) {
    setIsOpenMenu(false);
  }
 },[user])
 
  return (
    <header  className={`fixed top-0 left-0 z-50 bg-gray-900   w-full shadow-2xs`}>
       <nav id='navbar' className='flex justify-around items-center  text-black px-4   h-20  transition-all duration-300 
       md:px-16 '>
         
         <a href="">
           <h3 className="text-xl font-bold hover:scale-105 transition text-yellow-400 ">NOVA Bites</h3>
         </a>
        <ul className="hidden sm:flex items-center gap-10 font-semibold ">
          <li className={`  cursor-pointer ${location.pathname === '/home' ? 'text-yellow-600' : "text-white"} `}><a href="/home">Home</a></li>
          <li className={`  cursor-pointer ${location.pathname === '/aboute' ? 'text-yellow-600' : "text-white"} `}><a href="/aboute">About</a></li>
        </ul>

      

       {user && (
        <div className='flex items-center  gap-2 px-2 text-sm sm:text-base text-gray-700'>
         <FaUser className='text-gray-300' />
          <span className='truncate max-w-[100px] font-semibold text-gray-300'>Hi {user.name || user.username}</span>
        </div>
       ) }

       

        <Link to='/cart' className={`relative hover:text-yellow-400 rounded-full hover:scale-105 transition ${location.pathname === '/cart' ? 'text-yellow-400' : "text-white"}`}>
         <IoIosCart  size={24}/>
         {cartCount > 0 && (
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5'>{cartCount }</span>
         )}
        </Link>

        <div>
          <button onClick={handleLogout} className='hidden sm:block p-1 px-1 bg-gray-600 hover:text-red-500
           text-white rounded'>Logout</button>
        </div>

       <div className="relative">
      <button
        onClick={() => setIsOpenMenu(!isOpenMenu)}
        className="sm:hidden block p-1 text-2xl text-white "
      >
        <IoMdMenu />
      </button>
      </div>
      </nav>

      
       <ul
  className={`sm:hidden flex flex-col absolute top-20 right-0 w-full z-40 bg-gray-800 shadow transition-all duration-300 ease-in-out ${
    isOpenMenu
      ? 'opacity-100 translate-y-0 pointer-events-auto'
      : 'opacity-0 -translate-y-5 pointer-events-none'
  }`}
>

        <li className={`text-center p-2 w-full md:w-auto ${location.pathname === '/home' ? 'text-yellow-600' : 'text-white'}`}>
          <a href="/home">Home</a>
        </li>
        <li className={`text-center p-2  w-full md:w-auto ${location.pathname === '/aboute' ? 'text-yellow-600' : 'text-white'}`}>
          <a href="/aboute">Aboute</a>
        </li>
        <li className='text-center'>
        </li>
        <li className='text-center p-2 w-full md:w-auto '>
          <button onClick={handleLogout} className='bg-gray-600 text-white p-1 hover:text-red-500 rounded-md px-2'>Logout</button>
        </li>

        
      </ul>
    

       
    </header>
  )
}

export default Navbar
 