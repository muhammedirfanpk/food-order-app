import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";


const footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-4 px-5 md:px-20'>
       <hr className='text-gray-500 p-4' />
      <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8'>
        <div>
          <h1 className='text-lg font-bold mb-4'>NOVA Bites</h1>
          <p className='text-sm'>info@novabites.com</p>
          <p className='text-sm'>8590179040</p>
          <p className='text-sm'>Kerala Nilambur</p>
        </div>

        <div>
          <h1 className='text-lg font-bold mb-4'>Our Menu</h1>
          <p className='text-sm'>Breakfast</p>
          <p className='text-sm'>Lunch</p>
          <p className='text-sm'>Dinner</p>
        </div>

        <div>
          <h1 className='text-lg font-bold mb-4'>Information</h1>
          <p className='text-sm'>About Us</p>
          <p className='text-sm'>Testimonials</p>
          <p className='text-sm'>Bolg</p>
        </div>

        <div>
          <h1 className='text-lg font-bold mb-4'>Useful Links</h1>
          <p className='text-sm'>Services</p>
          <p className='text-sm'>Help & Support</p>
          <p className='text-sm'>Tearms & Conditions</p>
        </div>

        <div className=''>
          <h1 className='text-lg font-bold mb-4'>Social</h1>
          <p className='text-xl mb-2 l'> <FaFacebook /> </p>
          <p className='text-xl mb-2'> <FaInstagram /></p>
          <p className='text-xl'><FaTwitter /></p>
        </div>

       </div>

     
        

        <div className='text-center text-gray-400 text-sm mt-10'>
          &copy; 2025 NOVA Bites. All rights reserved
        </div>
        
    </footer>
    
  )
}

export default footer
