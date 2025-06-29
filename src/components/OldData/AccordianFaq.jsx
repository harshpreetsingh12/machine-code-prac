const faqs = [
  { question: "What is X?", answer: "X is ..." },
  { question: "How to use Y?", answer: "To use Y..." },
  { question: "Why choose Z?", answer: "Because Z..." },
]
import React, { useState } from 'react'

const Accordian = () => {
  const [ openIndex, setOpenIndex]= useState(0)
  return (
    <div>
      {faqs.map((faq,index)=>{
        return (
          <div 
            key={index} 
            onClick={()=>setOpenIndex(openIndex===index?null:index)}
            style={{cursor:'pointer'}}
          >
            <p>
              <b>{faq.question}</b>
            </p>
            {openIndex === index&&(
              <p> {faq.answer}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Accordian
