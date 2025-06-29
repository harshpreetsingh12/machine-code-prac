import React, { Fragment, useEffect, useRef, useState } from 'react'


//Need a timer to 
//set timer based on user input 

const TIMER_STATUS={
  STARTED:"STARTED",
  "PAUSED":"PAUSED",
  "EMPTY":"EMPTY"
}
export default function Timer () {
  const [totalTimerSeconds, setTotalTimerSeconds] =useState(0)
  const [timerStatus, setTimerStatus] =useState(TIMER_STATUS.EMPTY)
  const [timerValues, setTimerValues] = useState({hour:0,minutes:0,seconds:0});
  const timerRef= useRef(null)

  const handleSeconds=(e)=>{
    const value= parseInt(e.target.value)
    if(value>0 && value<60 ) setTotalTimerSeconds(prevSeconds=> prevSeconds+value)
  }

  const handleMinutes=(e)=>{
    const value= parseInt(e.target.value)
    if(value>0 && value<60 ) setTotalTimerSeconds(prevSeconds=> prevSeconds+value*60)
  }

  const handleHours=(e)=>{
    const value= parseInt(e.target.value)
    if(value>0 && value<60 ) setTotalTimerSeconds(prevSeconds=> prevSeconds+value*60*60)
  }
  const startTimer=()=>{
    setTimerStatus(TIMER_STATUS.STARTED)
    let timertotal=totalTimerSeconds
    timerRef.current= setInterval(()=>{
      console.log(timertotal)
      if(timertotal<=0) return resetTimer()
      timertotal-= 1
      setTimerValues({
        hour:Math.floor(timertotal / 3600),
        minutes: Math.floor((timertotal % 3600) / 60),
        seconds:timertotal % 60,
      })
      setTotalTimerSeconds(prevSeconds=> prevSeconds-1)

    },1000)
  }

  const pauseTimer=()=>{
    setTimerStatus(TIMER_STATUS.PAUSED)
    clearInterval(timerRef.current)
  }

  const resetTimer=()=>{
    setTimerStatus("EMPTY")
    setTimerValues({hour:0,minutes:0,seconds:0})
    clearInterval(timerRef.current)
    setTotalTimerSeconds(0)
  }
console.log(timerStatus)
  return (
    <div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px',alignItems:'center',height:"100vh",width:"100vw"}}>
      CounteDown timer -<br/>

      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'20px'}}>
          {["STARTED","PAUSE"].includes(timerStatus)  ? 
          <Fragment>
              <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                Hours
                  <input name='hours' type='number' disabled={true}  value={timerValues.hour} />
              </div>
              <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                Minutes
                <input name='minutes' type='number' disabled={true} value={timerValues.minutes} />
              </div>
              <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                Seconds
                <input name='seconds' type='number' disabled={true} value={timerValues.seconds}/>
              </div>
           
          </Fragment>
            :
          <Fragment>
            <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                Hours
                  <input name='hours' type='number' min={0} max={60} defaultValue={0} onChange={handleHours}/>
              </div>
              <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                Minutes
                <input name='minutes' type='number' min={0} max={60} onChange={handleMinutes} defaultValue={0}/>
              </div>
              <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
                Seconds
                <input name='seconds' type='number'  min={0} max={60} onChange={handleSeconds} defaultValue={0}/>
              </div>
          </Fragment>
            
            }
      </div>

      <div style={{display:'flex', gap:'10px'}}>
        {timerStatus==='STARTED' ?
          <button onClick={pauseTimer}>Pause</button>
          :
          timerStatus==='PAUSED' ?
         <button onClick={startTimer}>RESTART</button>
         :
         <button onClick={startTimer}>START</button>
        }
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}


