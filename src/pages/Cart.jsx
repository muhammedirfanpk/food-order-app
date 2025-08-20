import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { clearCart ,removeCart ,updateQuantity} from '../features/CartSlice'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    dispatch(removeCart(id));
  }

  const handleChangeQuantity = (id,quantity) => {
    dispatch(updateQuantity({id,quantity:Number(quantity)}))
  }


  const CalculateTotal = () => {
    return cartItems.reduce((acc, items) => acc + items.price * items.quantity, 0);
  }
  const handleCheckout = () => {
    const total = CalculateTotal();
    if(total > 0 ){
      toast.success('Checkout Successful');
      dispatch(clearCart());
      navigate('/home')
      
    } else {
      toast.error("Your cart is empty")
    }
  }
  
  return (
    <div className='bg-gray-900 text-white pt-20 min-h-screen'>
      
      <div className='m-8 md:m-13   p-5 md:p-7 rounded '>
        {
          cartItems.length > 0 ?(
            <>
            {cartItems.map((items,index) => (
              <div key={index } className=" flex items-center justify-between mb-2 shadow-md p-1  rounded bg-gray-800 hover:bg-gray-700" >
                <div className=''>
                   <img src={items.image} className='w-15 h-15 md:w-20 md:h-20 rounded-md' alt={items.name} />
                </div>
               
                 <h3 className=''>{items.name}</h3>
                 <p>₹ {items.price}</p>

                 <div>
                   <select value={items.quantity}
                    onChange={(e) => handleChangeQuantity(items.id,e.target.value)} aria-label={`Select quantity for ${items.name}`} >

                   {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>
                      {num}
                      </option>
                   ))}
                 </select>
                 </div>
                 <button onClick={() => handleDelete(items.id)} className='text-gray-500 text-xl hover:text-red-500 md:text-2xl '><MdDelete /></button>
              </div>
            ))}
           
            <div className=' max-w-md mx-auto px-4 sm:px-4 lg:px-8 shadow-md mt-6 bg-gray-700 rounded-md'>
               <p className='text-xl sm:text-2xl font-bold text-gray-400 pl-6 p-2 '> PRICE DETAILS</p>
               <hr className='text-gray-300 mt-2'/>
              <div className='p-5  text-center '>
                <p className='text-base sm:text-lg font-semibold text-gray-300 mb-4'>Total Amount : ₹ {CalculateTotal()} </p>
                <div className='flex items-center justify-between pt-3'>
               
               <button onClick={() => dispatch(clearCart(navigate("/home")))} 
                className=" bg-red-500 hover:bg-red-600 text-white p-2 text-xs sm:text-base py-2 px-4 rounded transition duration-200">Clear Cart</button>

                <button 
               className='bg-green-500 hover:bg-green-600 text-white p-2 text-xs sm:text-base py-2 px-4 rounded transition duration-200' 
               onClick={handleCheckout} >Checkout</button>

               </div>
              </div>
            </div>

            
            </>
          ) : (
            <div className='h-screen'>
               <p className='text-center p-10'> No items in cart </p>
            </div>
           
          )
        }
      </div>


      

      <footer className='flex flex-col md:flex-row flex-wrap items-center justify-between p-6 sm:p-10 text-sm gap-4 bg-gray-800 text-gray-500 pt-5'>
        <div className='flex  sm-flex-row flex-wrap items-center justify-center gap-4 text-center sm:text-left'>
          <p>Policies: Returns Policy</p>
          <p>Terms of use</p>
          <p>Security </p>
          <p>Privacy</p>
          <p>&copy; 2025 novabetis.com</p>
        </div>

        <div className='text-center sm:text-right' >
          <p>Need help? Visit the 
            <span className='text-blue-500 cursor-pointer mx-1'>Help Center</span>
             or 
             <span className='text-blue-500 cursor-pointer mx-1'>Contact Us</span></p>
        </div>
      </footer>

    </div> 
  
  )
}

export default Cart
