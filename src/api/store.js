import { configureStore } from "@reduxjs/toolkit";
import foodListReducer from '../features/productsSlice'
import authReducer from '../features/authSlice'
import cartRducer from '../features/CartSlice'
import themeReducer from '../features/themeSlice'

export const  store = configureStore({
    reducer:{
        product : foodListReducer,
        auth: authReducer,
        cart: cartRducer,
        theme: themeReducer,
    }
})
