import React, { Fragment, useEffect, useRef, useState } from 'react'

const PaginatedProducts = ({
    TOTAL_PRODUCTS=100,
    PER_PAGE=10
}) => {
    const [currentPage, setCurrentPage]= useState(1)
    const [isLoading, setIsLoading]= useState(false)
    const productMap=useRef({})
    const totalPages= Math.ceil(TOTAL_PRODUCTS / PER_PAGE);

    useEffect(()=>{
        getCurrentPageProduct()
    },[currentPage])

    async function getCurrentPageProduct(){
        // console.log(productMap.current)
        if(productMap.current?.[currentPage]) return
        setIsLoading(true)
        const products= await fakeFetch(currentPage, 10)
        setIsLoading(false)
        const existingMap={...productMap.current}
        existingMap[currentPage]=products
        productMap.current=existingMap
    }
    
    const handleGetPage=(page)=>{
        if(currentPage===page) return
        setCurrentPage(page)
    }
    
    const handlePrev=()=>{
        if(currentPage>1) setCurrentPage(prev=>prev-1)
    }
    const handleNext=()=>{
        console.log(currentPage)
         if(currentPage<totalPages) setCurrentPage(prev=>prev+1)
    }

  return (
    <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
        {new Array(totalPages).fill(null).map((_,i)=>{
            return (
                <button onClick={()=>handleGetPage(i+1)} 
                    style={{
                        border:i+1 === currentPage?'1px solid red':'unset'
                    }}
                    key={i}
                    disabled={currentPage===i+1}
                >
                    {i+1}
                </button>
            )
        })}
        {isLoading ?
            <p>Loading ...</p>
        :
            <Fragment>
                {productMap.current?.[currentPage] && productMap.current?.[currentPage].map(product=>{
                    return (
                        <div key={product.id}>
                            {product.name}
                        </div>  
                    )
                })}
                {productMap.current?.[currentPage] && productMap.current?.[currentPage].length===0 &&(
                    <p>No Product Found</p>
                )}
            </Fragment>
        }

    </div>
  )
}

export default PaginatedProducts

const fakeFetch = (page, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`
      }));
      const start = (page - 1) * limit;
      resolve(products.slice(start, start + limit));
    }, 1000); // 1 sec delay
  });
};
