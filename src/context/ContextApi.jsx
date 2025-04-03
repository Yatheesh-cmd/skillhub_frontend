import React, { useState, createContext } from 'react';

export const authContext = createContext();
export const cartContext = createContext();
export const wishlistContext = createContext();
export const courseResponseContext = createContext();

function ContextApi({ children }) {
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [courseResponse, setCourseResponse] = useState("");

  const addToCart = (item) => {
    console.log('Adding to cart in ContextApi:', item); // Debug item being added
    if (!item._id || !item.title || !item.instructor) {
      console.warn('Incomplete course data added to cart:', item);
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      }
      const newCart = [...prevCart, { ...item, quantity: 1 }];
      console.log('Updated cart in ContextApi:', newCart); // Debug updated cart
      return newCart;
    });
  };

  return (
    <authContext.Provider value={{ auth, setAuth, role, setRole }}>
      <cartContext.Provider value={{ cart, setCart, addToCart }}>
        <wishlistContext.Provider value={{ wishlist, setWishlist }}>
          <courseResponseContext.Provider value={{ courseResponse, setCourseResponse }}>
            {children}
          </courseResponseContext.Provider>
        </wishlistContext.Provider>
      </cartContext.Provider>
    </authContext.Provider>
  );
}

export default ContextApi;