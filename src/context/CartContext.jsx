import React, { useState } from 'react'
import { createContext } from 'react';

export const CartContextCreated = createContext({});

const CartContext = ({children}) => {
  const [products, setProducts] = useState([]);

  return (
     <CartContextCreated.Provider value={{ products, setProducts }}>
        {children}
     </CartContextCreated.Provider>
  )
}

export default CartContext
