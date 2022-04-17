import React from "react";
import { Route, Routes } from "react-router-dom";
import SampleLogin from "../Customer/sampleLogin";
import Shop from "../Customer/shop/shop";
import Footer from "../Customer/footer";
import Header from "../Customer/homeNavbar/homeNavbar";
import SingleProduct from "../Customer/singleProduct/singleProduct";
import Chatpanel from "../Customer/chatpanel/chatpanel";
import Home from "../Customer/home/home";

import { CartProvider } from "../Customer/CartContext";

function CustomerRoutes(props) {
  return (
    <CartProvider>
        <Header />
        <Routes>
          <Route path="/login" exact element={<SampleLogin />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/footer" exact element={<Footer />} />
          <Route path="/header" exact element={<Header />} />
          <Route path="/single" exact element={<SingleProduct />} />
          
          <Route path="/chat" exact element={<Chatpanel userId="61d9354e52dbabae9bd6053f" role="seller" />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
    </CartProvider>
  );
}

export default CustomerRoutes;
