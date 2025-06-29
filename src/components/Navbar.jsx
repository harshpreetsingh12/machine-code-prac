import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigator= useNavigate()
  return (
    <nav>
        <button
          onClick={()=>{
            navigator('/')
          }}
        >
          Home
        </button>
        <button
          onClick={()=>{
            navigator('/cart')
          }}
        >
          Cart
        </button>
    </nav>
  )
}

export default Navbar
