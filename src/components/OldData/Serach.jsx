import React, { useEffect, useState,useRef } from 'react'

const ENDPOINT="https://jsonplaceholder.typicode.com/users"
const Serach = () => {
    const [ users, setUsers ]= useState([])
    const [ searchResults, setSearchResults ]= useState([])
    const [ query, setQuery ]= useState('')

    const timeOut= useRef()
    useEffect(()=>{
        const fetchUsers= async ()=>{
            const response= await fetch(ENDPOINT)
            const users= await response.json();
            setUsers(users)
        }
        fetchUsers()
    },[])

    function debouncedSearch(e){
        const value= e.target.value
        setQuery(value)
        if(value.trim().length===0) return setSearchResults([])
        if(timeOut.current){
            clearTimeout(timeOut.current)
        }
        timeOut.current=setTimeout(()=>{
            const result= users.filter(user=> 
               user.name.toLowerCase().startsWith(value.toLowerCase())
            )
            setSearchResults(result)
        },500)
    }

    return (
    <div>
        <label>Search</label>
        <input 
            placeholder='Eg harsh'
            onChange={debouncedSearch}
        />

        <p>Search Results</p>
        {searchResults.map(user=>{
           return (
               <p key={user.id}>
                <strong>{user.name.slice(0, query.length)}</strong>
                 {user.name.slice(query.length)}
               </p>
            ) 
        })}
        {searchResults.length===0 &&(
            <p>No Results Found</p>
        )} 
    </div>
  )
}

export default Serach


/**
 * 🔧 Frontend Mock Challenge (Live Coding Style)
🧩 Problem: Searchable User List with Debounce

Build a React component called UserSearch that:

Shows a search input.

Fetches a list of users from a given mock API.

As the user types, filter the list using a debounce of 500ms.

Show the filtered users in a list.

Display “No users found” if the search yields nothing.

🧑‍💻 Requirements:
Use React functional components

Use hooks: useState, useEffect

Implement debounce logic manually (no external libraries)

Show a loading indicator during API call

Use a mock API like:

https://jsonplaceholder.typicode.com/users
✅ Bonus (if you have time):
 */