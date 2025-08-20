import React, { useEffect } from 'react'
import { useSelector,useDispatch } from "react-redux";
import { fetchproducts , setCategory} from "../features/productsSlice";
import { addToCart } from '../features/CartSlice';
import heroImage from '../assets/hero1.png';
import { IoSearch } from "react-icons/io5";
import { setSearchTerm } from '../features/productsSlice';



const Home = () => {
  const dispatch = useDispatch();
  const { items , loading , category,searchTerm} = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.cartItems); 

  const filterdItems = items.filter((item) => {
  const matchesCategory = category === 'All' || item.category === category;
  const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
  return matchesCategory && matchesSearch;
  });

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }
useEffect(() => {
  dispatch(fetchproducts());
},[dispatch]);

const inStockProducts = filterdItems.filter(product => product.stock);

  
  
  const handleClick = (items) => {
    !cartItems.find((i) => i.id === items.id) && dispatch(addToCart(items))
  }

 



    const bestSellings = [14,15,18,16];
    const bestSellingProducts = items.filter(product => 
      bestSellings.includes(product.id)
    )

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="border-t-4 border-yellow-400 border-solid rounded-full h-12 w-12 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={` pt-24 px-8 bg-gray-900  transition-colors duration-300 pb-10`}>

      <div className='grid grid-cols-1 md:grid-cols-2  items-center gap-6 px-8 py-5 bg-gray-800 rounded '>
        <div className='text-center md:text-left '>
          <h2 className='text-3xl md:text-4xl font-bold mb-4 text-gray-800 text-center'>Delicious Food is Waiting For You</h2>
          <p className='text-yellow-500 text-2xl text-center'>Our team of registered nurses and skilled healthcare professionals provide in-home nursing</p>
          <a href="#menu">
             <button  className='bg-yellow-400 text-white px-5 py-2 rounded-3xl  hover:bg-yellow-500 transition duration-300 mt-4'>Food menu</button>
          </a>
         
        </div> 
        <div className='flex justify-center'>
          <img src={heroImage}  alt="Delicious Food" className='w-110 h-110 mx-w-md rounded-full  hover:scale-105 transition duration-300' />
        </div>
      </div>


      <div>
        <div>
          <h2 className='text-3xl font-bold text-center p-5 text-gray-500'>BEST SELLING DISHES</h2>
        </div>
        <div className='grid grid-cols-2  md:grid-cols-4 lg:grid-cols-4 gap-6'>
          {bestSellingProducts.map((product) => (
             <div key={product.id} className={ `  bg-gray-700  rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-105 transition-all duration-300`}>
              <img src={product.image} alt={product.name} className='w-full h-40 object-cover rounded-lg mb-3'/>
              <h3 className='text-xl font-semibold text-gray-300 mb-1 text-center'>{product.name}</h3>
              <p className='text-sm text-center text-gray-500 mb-3'>{product.discription}</p>
              <div className='flex  items-center justify-between  '>
                 <p className='font-bold text-gray-300 text-base'>₹{product.price}</p>
                 <button className=' md:px-4 py-1 text-xs md:text-sm  text-white   border-1 border-yellow-400 hover:bg-yellow-400 hover:text-white rounded-full transition duration-300' onClick={() => handleClick(product)}>Add to cart</button>
              </div> 
             
            </div>
          ))}
        </div>
      </div>


       
       <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-9 pb-6 md:px-6'>
            <div className="relative w-full sm:w-1/2 ">
          <IoSearch className='absolute left-3 top-5 transform -translate-y-1/2 text-gray-500 text-lg sm:text-xl'/>
          <input type="text" onChange={handleSearch}  placeholder="Find your food here..."
           className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-800 rounded-md text-sm sm:text-base text-gray-400  md:w-100   focus:outline-none " />
        </div>

          <div className='w-full sm:w-1/4 '>
            <select 
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
            className='w-full px=3 py-2 border text-center border-gray-600 rounded-md text-sm sm:text-base bg-gray-800 text-gray-400 focus:outline-none'>
              <option  value="All">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </select>
          </div>

       </div>
      


      
      { inStockProducts.length === 0 ? (
        <p className='text-center  text-gray-300 mt-3'>No products found for <span className='font-semibold'>{searchTerm} in <span className='font-semibold'>{category}</span></span> category. </p>
      )
       : (
        <div className=''>
          <h2 id='menu' className='text-center font-bold text-3xl p- p-5 text-gray-500'>FOOD MENU</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
          {inStockProducts.map((product) => (
            <div key={product.id} className=" bg-gray-700 rounded-xl shadow-md p-4 hover:shadow-lg hover:scale-95 transition-all duration-300" >
              <img src={product.image} alt={product.name} className='w-full h-40 object-cover rounded-lg mb-3'/>
              <h3 className='text-xl font-semibold text-gray-300 mb-1 text-center'>{product.name}</h3>
              <p className='text-sm text-center text-gray-500 mb-3'>{product.discription}</p>
              <div className='flex items-center justify-between  '>
                 <p className='font-bold text-gray-300 text-base'>₹{product.price}</p>
                 <button className='px-4 py-1 text-sm  text-white   border-1 border-yellow-400 hover:bg-yellow-400 hover:text-white rounded-full transition duration-300' onClick={() => handleClick(product)}>Add to cart</button>
              </div>
             
            </div>
          ))}
        </div>
        </div>

      )}
     
    </div>
  )
}

export default Home


