import React, {  useEffect, useMemo, useState } from 'react'
import { items } from '../var';
import { useQuery } from 'react-query';

const baseUrl="https://jsonplaceholder.typicode.com/photos"
const DebouncedSearch = () => {
  const page=0;
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTerm, setDebounceTerm] =useState(searchTerm)


  const {
    data:posts,
    isError,
    isStale,isSuccess
  }= useQuery({
    queryKey:['posts',{page}],
    queryFn: async () =>{
      const res= fetch(baseUrl);
      return await res
    }
  })
  console.log(posts, isError, isStale, isSuccess)
  useEffect(()=>{
    // using a use effet here

    // using a setimeout to track the 500ms gap
    let timeout= setTimeout(()=>{
      setDebounceTerm(searchTerm)
    },500)
    return (()=>{
      //clearing the last timeout every time the new key stroke event comes
      clearTimeout(timeout)
    })

    //this effect has dependency of search term which is changed 
  },[searchTerm])



  // as you can see this funciton is used to filter some items from a list 

  //the 
  const filteredItems= useMemo(()=>{
    return items.filter(item =>
      item.toLowerCase().includes(debounceTerm.toLowerCase())
    )
  },[debounceTerm])

  return (
    <div>
      <h2>Search Fruits</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} >
              {item}
            </li>
          ))
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
}

export default DebouncedSearch
