import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./homeComponent/homepage";
import AdminHome from "./adminComponents/adminHome";
import SellerHome from "./sellerComponents/sellerHome";
import CustomerHome from "./customerComponents/customerHome";
import SignUp from "./authenticationComp/signup";
import Login from "./authenticationComp/login";

import SampleLogin from "./authenticationComp/sampleLogin";

import React from "react";
import SingleProduct from "./homeComponent/singleProduct";
import Home from "./homeComponent/home/home";
import Chatpanel from "./customerComponents/chatpanel/chatpanel";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/login" exact element={<SampleLogin />} />
        <Route path="/admin" exact element={<AdminHome />} />
        <Route path="/seller" exact element={<SellerHome />} />
        <Route path="/customer" exact element={<CustomerHome />} />

        <Route path="/plants" exact element={<Homepage category="plants" />} />
        <Route path="/seeds" exact element={<Homepage category="seeds" />} />
        <Route path="/tools" exact element={<Homepage category="tools" />} />
        <Route path="/fertilizers" exact element={<Homepage category="fertilizers" />} />
        <Route path="/services" exact element={<Homepage category="services" />} />
        <Route path="/blogs" exact element={<Homepage category="blogs" />} />

        <Route path="/products/:_id" exact element={<SingleProduct />} />   
        <Route path="/chat" exact element={<Chatpanel userId="61d9354e52dbabae9bd6053f" role="seller" />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
