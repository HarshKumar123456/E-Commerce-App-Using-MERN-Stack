import React, { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const existingItemsInCart = localStorage.getItem("cart");
        if (existingItemsInCart) {
            const parseDataInExistingCart = JSON.parse(existingItemsInCart);
            const cartItems = [...cart, ...parseDataInExistingCart];
            setCart(cartItems);
        }
    }, []);

    return <>
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    </>;
};

const useCart = () => useContext(CartContext);


export {useCart,CartProvider};