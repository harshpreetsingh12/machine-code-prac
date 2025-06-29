import React, { useContext, useEffect, useMemo } from 'react'
import { CartContextCreated } from '../context/CartContext'
import ProductCard from './ProductCard'

const Cart = () => {
  const { products, setProducts } =useContext(CartContextCreated)

  const cartProductNames= useMemo(()=>{
    const cartProdNames=[]
    products.forEach(product=>{
      if(!cartProdNames.includes(product.category)) cartProdNames.push(product.name)
    })
      return cartProdNames
  },[products])

  const totalCartPrice= useMemo(()=>{
    let totalPrice=0;
    products.forEach(product=>{
      totalPrice = totalPrice + (product.price * (product?.quantity || 1))
    })
    return totalPrice
  },[products])

  useEffect(()=>{
    const storeCart= localStorage.getItem('cart') 
    if(!storeCart) return
    const parsedCard= JSON.parse(storeCart)
    setProducts(parsedCard)
  },[])

  return (
    <div>
      <h1>Total Price ${totalCartPrice}</h1>
      <div className='productList'>
          {products.map((product)=>{
            return (
              <ProductCard
                key={product.id}
                product={product}
                isCart={true}
                isAddedToCart={cartProductNames.includes(product.name)}
              />
            )
          })}
        </div>
    </div>
  )
}

export default Cart
