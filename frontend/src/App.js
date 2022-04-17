import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CustomerRoutes from "./Routes/customerRoutes";
import AdminRoutes from "./Routes/adminRoutes";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<CustomerRoutes />} />
        <Route exact path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
