import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../Admin/adminHome";
import SellerHome from "../Seller/sellerHome";

function AdminRoutes(props) {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<AdminHome />} />
        <Route path="/seller" exact element={<SellerHome />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
