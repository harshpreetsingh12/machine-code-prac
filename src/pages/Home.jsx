import React, { useContext, useMemo, useRef, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { CartContextCreated } from '../context/CartContext'
import TagInput from '../components/TagInput'

const Home = () => {
  const { products:cartProducts } =useContext(CartContextCreated)
  const [filters, setFilters]= useState({
    searchQuery:'',
    selectedCategory:[],
    pricingFirst:''// this will be high if user needs high to low and vice versa
  })
  const timeOutRef= useRef(null)
  
  const categories= useMemo(()=>{
    const categories=[]
    ProductsListing.forEach(product=>{
      if(!categories.includes(product.category)) categories.push(product.category)
    })
    return categories
  },[])
  
  const cartProductNames= useMemo(()=>{
    const cartProdNames=[]
    cartProducts.forEach(product=>{
      if(!cartProdNames.includes(product.category)) cartProdNames.push(product.name)
    })
    return cartProdNames
  },[cartProducts])

  const filteredList=useMemo(()=>{
    let currentList=[...ProductsListing]
    const {searchQuery, selectedCategory, pricingFirst}= filters
    if(searchQuery && searchQuery.trim().length>0){
      // serach by name 

      currentList= currentList.filter(product=>product.name.toLowerCase().startsWith(searchQuery))
    }

    if(selectedCategory.length>0){
      currentList= currentList.filter(product=>selectedCategory.includes(product.category))
    }

    if(pricingFirst && pricingFirst.trim().length>0){
      if(pricingFirst==='high'){
        currentList= currentList.sort((productA,productB)=>productA.price-productB.price)
      }
      else if(pricingFirst==='low'){
        currentList= currentList.sort((productA,productB)=>productB.price-productA.price)
      }
    }
    return currentList;
  },[filters])

  const handleSearch=(e)=>{
      if(timeOutRef.current) clearTimeout(timeOutRef.current)
      timeOutRef.current= setTimeout(()=>{
        timeOutRef.current=null;
        const value= e.target.value
        setFilters(prev=>({
          ...prev,
          searchQuery:value
        }))
      },500)
  }

  const toggleCategoryCheckHandler=(category, checked)=>{
    if(checked){
      //user wants to filter on this cateory
      setFilters((prev)=>{
        return {
        ...prev,
        selectedCategory:[...prev.selectedCategory, category]
      }
      })
    }
    else{
      setFilters((prev)=>{
        return {
        ...prev,
        selectedCategory:prev.selectedCategory.filter(cat=>cat!==category)
      }
      })
      //remove
    }
  }

  const onSelectPricingFilter=(e)=>{
    const value= e.target.value
    setFilters(prev=>{
      return {
        ...prev,
        pricingFirst:value
      }
    })
  }

  return (
    <div>
     
      {/* filter */}
      <div className='filterSwtich'>
        <div className='categoris'>
          <label>Categories</label>
            {categories.map((category,index)=>{
              return (
                <div key={index}>
                  <label>
                    {category}
                  </label>
                    <input
                      type='checkbox'
                      onChange={
                        (e)=>toggleCategoryCheckHandler(
                          category,
                          e.target.checked
                        )
                      }
                      checked={filters.selectedCategory.includes(category)}
                    />
                </div>
              )
            })}
        </div> 

        <input
          onChange={handleSearch}
          placeholder='Start Searching'
        />
        
        <div>
          <label>
            Pricing
          </label>
          <select
            onChange={onSelectPricingFilter}
          >
            <option value={''}>None</option>
            <option value='high'>Pricing (high to low)</option>
            <option value='low'>Pricing (low to high)</option>
          </select>
        </div>
      </div>
      {/* List of products */}
      <div className='productList'>
        {filteredList.map((product)=>{
          return (
            <ProductCard
              key={product.id}
              product={product}
              isAddedToCart={cartProductNames.includes(product.name)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Home

const ProductsListing = [
  {
    id: 1,
    name: "Running Shoes",
    price: 2499,
    category: "Shoes",
    image: "https://picsum.photos/200?random=1"
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 3499,
    category: "Clothing",
    image: "https://picsum.photos/200?random=2"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 6999,
    category: "Electronics",
    image: "https://picsum.photos/200?random=3"
  },
  {
    id: 4,
    name: "Bluetooth Headphones",
    price: 1999,
    category: "Electronics",
    image: "https://picsum.photos/200?random=4"
  },
  {
    id: 5,
    name: "Casual T-Shirt",
    price: 799,
    category: "Clothing",
    image: "https://picsum.photos/200?random=5"
  },
  {
    id: 6,
    name: "Formal Shoes",
    price: 3299,
    category: "Shoes",
    image: "https://picsum.photos/200?random=6"
  },
  {
    id: 7,
    name: "Backpack",
    price: 1299,
    category: "Accessories",
    image: "https://picsum.photos/200?random=7"
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 999,
    category: "Accessories",
    image: "https://picsum.photos/200?random=8"
  },
  {
    id: 9,
    name: "Jeans",
    price: 2199,
    category: "Clothing",
    image: "https://picsum.photos/200?random=9"
  },
  {
    id: 10,
    name: "Fitness Tracker",
    price: 2499,
    category: "Electronics",
    image: "https://picsum.photos/200?random=10"
  },
  {
    id: 11,
    name: "Hiking Boots",
    price: 3899,
    category: "Shoes",
    image: "https://picsum.photos/200?random=11"
  },
  {
    id: 12,
    name: "Leather Belt",
    price: 599,
    category: "Accessories",
    image: "https://picsum.photos/200?random=12"
  }
];

