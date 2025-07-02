import React, { useEffect, useRef, useState } from 'react'

const InfiniteScroll = () => {
    const [currentPage, setCurrentPage]= useState(1)
    const [products, setProducts]= useState([])
    const [restrictFetch, setRestrictFetch]= useState(false)
    const [isLoading, setIsLoading]= useState(false)
    const scrollDivRef=useRef()
    const fetchedPage=useRef([])

    useEffect(()=>{
        if(fetchedPage.current.includes(currentPage) || restrictFetch) return
        getCurrentPageProduct()
    },[currentPage])
    
    async function getCurrentPageProduct(){
        setIsLoading(true)
        const products= await fetchData(currentPage, 10)
        setIsLoading(false)
        if(products.length===0) {
            setRestrictFetch(true)
        }
        setProducts(prev=>([...prev,...products]))
        fetchedPage.current=[...fetchedPage.current, currentPage]
    }

    const handleScroll=()=>{
        if(isLoading || restrictFetch) return
        const el = scrollDivRef.current;
        const {scrollTop, scrollHeight, clientHeight} =el
        const totalScrollable = scrollHeight - clientHeight;

        if((totalScrollable-scrollTop) <100){
            setCurrentPage(prev=>prev+1)
        }
    }
  return (
    <div>
        <div style={{ overflow:'scroll',height:'700px'}} onScroll={handleScroll} ref={scrollDivRef}>
            {products.map(product=>{
                return (
                    <div key={product.id} style={{ height:'100px'}}>
                            {product.title}
                    </div>  
                    )
            })}
        </div>
        {isLoading && (<div>Loading....</div>)}
    </div>
  )
}

export default InfiniteScroll

function fetchData(page, limit) {
  return new Promise(res =>
    setTimeout(() => {
      const data = Array.from({ length: limit }, (_, i) => ({
        id: (page-1)*limit + i + 1,
        title: `Item ${(page-1)*limit + i + 1}`
      }));
      res(data.length ? data : []);
    }, 800)
  );
}
