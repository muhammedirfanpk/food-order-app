import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    user: JSON.parse(localStorage.getItem("currentUser")) || null,
}  ;

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        signup:(state, action) => {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(action.payload);
            localStorage.setItem("users",JSON.stringify(users));
            localStorage.setItem("currentUser",JSON.stringify(action.payload));
            state.user = action.payload;
            
        },
        login: (state,action) => {
           state.user = action.payload;
           localStorage.setItem("currentUser",JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("currentUser");
        },
    },
});

export const  {signup, login , logout} = authSlice.actions;
export default authSlice.reducer;