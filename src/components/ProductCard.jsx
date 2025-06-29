import React, { useContext } from 'react'
import { CartContextCreated } from '../context/CartContext'

const ProductCard = ({
  product,
  isCart=false,
  isAddedToCart=false,
}) => {
  const { products, setProducts } =useContext(CartContextCreated)

  const addToCart=()=>{
    let existingProducts=[...products]
    if(isAddedToCart) {
      existingProducts=existingProducts.filter(prod=>product.name!==prod.name)
    }
    else{
      existingProducts.push(product)
    }
    setProducts(existingProducts)
    localStorage.setItem(
      'cart',
      JSON.stringify(existingProducts)
    ) 
  }

  const handleQuanity=(increase=false)=>{
    const existingProduct={...product}
    if(increase){
      existingProduct.quantity=existingProduct?.quantity ? existingProduct.quantity + 1 : 2
    }
    else{
      existingProduct.quantity=existingProduct?.quantity ? existingProduct.quantity -1 : 0
    }
    const newProducts=products.map(prod=>{
      if(prod.id===product.id){
        if(existingProduct.quantity <=0) return
        return existingProduct
      }
      return prod
    }).filter(prod=>prod)

    setProducts(newProducts)
    localStorage.setItem(
      'cart',
      JSON.stringify(newProducts)
    ) 
  }
  return (
    <div className='product'>
      <img
        src={product.image}
        alt={product.name}
      />
      <div className='productLower'>
        <p>{product.name}</p>
        <h4>${product.price}</h4>
        <span>{product.category}</span>
        {isCart && (
          <div>
            <button onClick={()=>handleQuanity(true)}>+</button>
            <span>{product?.quantity ?? 1}</span>
            <button  onClick={()=>handleQuanity()}>-</button>

          </div>

        )
        }
        <button
          onClick={addToCart}
        >
          {isAddedToCart? "Remove from cart" :"Add to Cart"}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
