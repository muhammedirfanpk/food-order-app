// import { createSlice } from "@reduxjs/toolkit";

//   const initialState = {
//     mode: JSON.parse(localStorage.getItem("mode")) === "true" || false,
//   }
//    export const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         toggleDark: (state) => {
//             state.mode = !state.mode;
//             localStorage.setItem("mode",JSON.stringify (state.mode));
//         }
//     },
// });

// export const {toggleDark} = themeSlice.actions;
// export default themeSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";


   export const themeSlice = createSlice({
    name: 'theme',
    initialState:{darkMode:false}, 
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    },
});

export const {toggleDarkMode} = themeSlice.actions;
export default themeSlice.reducer;