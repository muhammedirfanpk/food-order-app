import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
    cartItems : JSON.parse(localStorage.getItem('cartItems')) || []
 };

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers:{
        addToCart: (state,action) => {
            const exists = state.cartItems.find(items => items.id === action.payload);
            if(!exists) {
                const itemsQuantity = {...action.payload, quantity :1};
                state.cartItems.push(itemsQuantity);
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            }
        },
        
        removeCart : (state, action) => {
          const  filtered = state.cartItems.filter(
                (items) => items.id !== action.payload
            );
            state.cartItems = filtered;
            localStorage.setItem('cartItems', JSON.stringify(filtered));
        },
        clearCart : (state) => {
            state.cartItems =[];
            localStorage.removeItem('cartItems')
        },
        updateQuantity : (state,action) => {
            const {id,quantity} = action.payload;
            const items = state.cartItems.find(items => items.id === id);
            if (items) {
                items.quantity = quantity;
                localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
            }
        }
    }
})

export const {addToCart, clearCart,removeCart,updateQuantity} = cartSlice.actions
export default cartSlice.reducer