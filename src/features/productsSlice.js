import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";


  let savedProducts = [];

  try {
  const stored = localStorage.getItem('products');
  savedProducts = stored && stored !== "undefined" ? JSON.parse(stored) : [];
} catch (err) {
  savedProducts = [];
}

const initialState = {
  items: savedProducts,
  loading: false,
  error: null,
  category: 'All',
  searchTerm: '',
};
   
export const fetchproducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get(`${import.meta.env.BASE_URL}FoodItems.json`);
  return response.data;
});
const productsSlice = createSlice({
   name:'products',
   initialState,
   reducers:{
    addProduct : (state, action)=>  {
      state.items.push({...action.payload, stock : true});
        localStorage.setItem('products',JSON.stringify(state.items))
    },
   
    updateProduct: (state,action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      console.log(index)
      if (index !== -1 ) {
        state.items[index] = action.payload;
        localStorage.setItem('products',JSON.stringify(state.items));
      }
    },
      setCategory:(state,action)=> {
         state.category = action.payload;
      },
      setSearchTerm: (state,action) => {
        state.searchTerm = action.payload;
      },
     
   },

  extraReducers: (builder) => {
  builder
    .addCase(fetchproducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchproducts.fulfilled, (state, action) => {
      state.loading = false;
      
      const stored = localStorage.getItem('products');

      if(!stored || stored === 'undefined') {
        const loadedItems = action.payload.map(item => ({
        ...item,
        stock: true, 
      }))
      state.items = loadedItems;
      localStorage.setItem('products', JSON.stringify(loadedItems));
      } else {
        state.items = JSON.parse(stored);
      }
      
    })
    .addCase(fetchproducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}
   
});

export const {setCategory,addProduct,updateProduct,setSearchTerm} = productsSlice.actions;

export default productsSlice.reducer;


