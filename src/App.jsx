import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import CartContext from "./context/CartContext";
import UserType from "./pages/UserType";
import PaginatedProducts from "./pages/PaginatedProducts";

const App = () => {
  return (
     <CartContext>
      <Router>
        <Layout>
          <Routes>
            <Route path="/pagination" element={<PaginatedProducts/>} />
            <Route path="/userType" element={<UserType/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>} />
          </Routes>
        </Layout>
      </Router>
     </CartContext>

  );
};

export default App;