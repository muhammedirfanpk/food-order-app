// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//  products : JSON.parse(localStorage.get('products')) ||[] ,
//  loading:false,
//  error:null,
 

// }

//  export const fetchProduct = createAsyncThunk('products/fetch', async() =>{
//     const response = await axios.get('/FoodItems.json');
//     localStorage.setItem('products',JSON.stringify(response.data))
//     console.log(response.data);
//     return response.data
//  })


// const  adminSlice = createSlice({
//     name : 'admin',
//     initialState,
//     reducers: {
//         addProduct:{

//         }
//     }
// })

// export const {addProduct} = adminSlice.actions

// export default adminSlice.reducer