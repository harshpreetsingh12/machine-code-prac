import React, { useRef, useState } from 'react'

const usersInitial=[
    {
        name:'user 1',
        color:'red'
    },
    {
        name:'user 2',
         color:'blue'
    },
    {
        name:'user 3',
         color:'green'
    },
]
const UserType = () => {
    // const typingTimeouts = useRef({})
    const [typingTimeouts, setTypeTimeOuts] = useState({})

    const handleTyping= (index)=>{
        const timeOut=typingTimeouts?.[index]
        if(timeOut){
            clearTimeout(timeOut)
        }
        const newTimeOut=setTimeout(()=>{
            setTypeTimeOuts((prev) => ({
                ...prev, 
                [index]: null 
            }));
        },1500)
        setTypeTimeOuts((prev) => ({
            ...prev, 
            [index]: newTimeOut 
        }));
    }
  return (
    <div>
      {usersInitial.map((user,index)=>{
        return (
            <p key={index} >
                <span 
                    style={{
                        height:'10px',width:'10px',backgroundColor:user.color, display:'block', borderRadius:'50%'
                    }}
                />
                {user.name} - 
                <b>
                    {typeof typingTimeouts[index]==='number' ?'typing...':'Not Typng'}
                </b>
            </p>
        )
      })}
      {usersInitial.map((user,index)=>{
        return (
            <input
                key={index}
                onKeyDown={()=>handleTyping(index)}
                placeholder='add tag'
            />
        )
      })}
    </div>
  )
}

export default UserType
