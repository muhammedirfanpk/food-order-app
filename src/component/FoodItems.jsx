import { useDispatch } from "react-redux"
import { addToCart } from "../features/CartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FoodItems = ({items}) => {
  const {currentUser} = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleClick = (items) => {
    !cartItems.find((i) => i.id === items.id) && dispatch(addToCart(items))
   
  }
  
  
  return (
    <div className=" w-55 h-60 md:w-50 md:h-62  border rounded-2xl text-center mx-auto ">
     <img className="w-full h-37 md:w-full md:h-40 object-cover  rounded-2xl mx-auto transform hover:scale-105 transition  duration-300 "
      src={items.image} alt="" />
      <h2 className="mt-1  text-sm md:text-md">{items.name}</h2>
      <div className="flex justify-between px-5 md:px-5 mt-4 md:mt-3 ">
        <p className="flex items-center font-semibold  md:text-sm">₹{items.price}</p>
      <button onClick={() => handleClick(items)} 
       className="mt-2 bg-blue-400 w-23 p-1  rounded-2xl text-sm md:text-md md:mt-2 md:w-25 md:p-2
        hover:bg-blue-500">Add to cart</button>
      </div>
      
    </div>

   
  )
}

export default FoodItems
