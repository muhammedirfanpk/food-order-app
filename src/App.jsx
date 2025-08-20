

import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./component/Navbar";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import toast, { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';
import ProtectedRoute from "./component/ProtectedRoute";
import Signup from "./pages/Signup";
import Footer from "./component/Footer";
import './app.css';

 



const App = () => {
  const location = useLocation();
  const hideNavbarFooterPaths = ["/", "/signup","/admin"];
  const hideNavbarFooter = hideNavbarFooterPaths.includes(location.pathname)

 const hideFooterPath = ["/cart"];
 const hideFooter = hideFooterPath.includes(location.pathname)
  return (
    <div>
      <Toaster position="top-center" />
      
    
      {!hideNavbarFooter && <Navbar/>}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/home" element={
          <ProtectedRoute role="user">
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/aboute" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Login />} />
      </Routes>

      {!hideNavbarFooter && !hideFooter && <Footer/>}

      
    </div>
  );
};

export default App;
