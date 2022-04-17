import React, { useState, useContext } from "react";

import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const CartContext = React.createContext();
const CartUpdateContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}
export function useCartUpdate() {
  return useContext(CartUpdateContext);
}

const notifySuccess = () => {
  // Calling toast method by passing string
  toast.success("Product added to cart.", {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    background: "#34A853",
  });
};
const notifyInfo = () => {
  toast.info("Select valid quantity of products.", {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    background: "#34A853",
  });
};

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const handleAddToCart = (item, quantity) => {
    if (quantity === 0) {
      notifyInfo();
      return;
    }
    notifySuccess();
    const i = cartProducts.findIndex((prod) => prod.productId === item._id);
    if (i > -1) {
      let cartProd = cartProducts;
      cartProd[i].quantity += quantity;
      setCartProducts(cartProd);
    } else {
      const cartProd = {
        sellerId: item.storeInfo[0]._id,
        storeName: item.storeInfo[0].storeName,
        productId: item._id,
        productName: item.productName,
        productPrice: item.price,
        quantity: quantity,
      };
      setCartProducts([...cartProducts, cartProd]);
    }
    console.log(cartProducts);
  };

  return (
    <CartContext.Provider value={cartProducts}>
      <CartUpdateContext.Provider value={handleAddToCart}>
        {children}
      </CartUpdateContext.Provider>
    </CartContext.Provider>
  );
}
