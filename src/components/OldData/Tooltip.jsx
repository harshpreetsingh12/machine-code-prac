import React, { Fragment, useMemo, useRef, useState } from 'react'

const positionValues= {
    bottom:{
        bottom: '-20px',
    },
    top:{
        top: '-20px',
    },
    
}
const Tooltip = ({
    position='bottom',
    content='',
    children,
    delay=200

}) => {
    const [showTip, setShowTip] = useState(false);

    const timeOut= useRef()
    const tolTipRef= useRef()

    const handleOpen=()=>{
        timeOut.current= setTimeout(()=>{
            setShowTip(true)
        },delay)
    }
    const handleClose=()=>{
        if(timeOut.current) clearTimeout(timeOut.current)
        setShowTip(false)
    }

    const Stats= useMemo(()=>{
        if(['bottom','top'].includes(position)) return positionValues[position]
        if(!tolTipRef.current) return {}
        const toolTipWidth=tolTipRef.current.offsetWidth
        console.log(toolTipWidth)
        if(position==='right'){
            return {
                right: `${-( toolTipWidth + 5)}px`
            }
        }
        else{
            return {
                left: `${-( toolTipWidth + 5)}px`
            }
        }
    },[position,tolTipRef.current])

  return (
      <div style={{position:'relative'}} 
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={()=>setShowTip(true)}
        onBlur={() => setShowTip(false)}
      >
          <p
            role='tooltip' 
            ref={tolTipRef}
            style={{
                background:'gray',
                position:'absolute',
                visibility:showTip?'visible':'hidden',
                margin:'0px',
                padding:'5px',
                width:'120px',
                ...Stats,
            }}
          >{content}</p>
        {children}
      </div>
  )
}

export default Tooltip
