import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './api/store.js'
import { BrowserRouter } from 'react-router-dom'


const adminUser = {
  email:"admin@gmail.com",
  password:"admin123",
  name: "Admin",
  role:"admin"
};

if(!localStorage.getItem("admin")) {
  localStorage.setItem("admin", JSON.stringify(adminUser));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter basename='/food-order-app'>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
