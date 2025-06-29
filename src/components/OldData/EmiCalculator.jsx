import React, { useEffect, useState } from 'react'

const DEFAULT_LOANAMOUNT=10000
const DEFAULT_INTEREST=1
const DEFAULT_TENURE=1
const DEFAULT_PF=1

const EmiCalculator = () => {

  const [loanInformations, setLoanInformation]= useState({
    totalAmount:DEFAULT_LOANAMOUNT,
    interestRate:DEFAULT_INTEREST,
    processingFee:DEFAULT_PF,
    tenure:DEFAULT_TENURE,
    donwPayment: 0,
    totalEmiAmount:0,
    usersEMiMonth:0
  })

  const [totalEmiAmountPerMonth, setTotalEmIAmountPerMonth]= useState(0)

  const calculateFinalLoanAmount=()=>{
    const {totalAmount,processingFee,donwPayment,interestRate,tenure}=loanInformations

    const orignalAmount = totalAmount- donwPayment
    const ProcessignFreeAmount =orignalAmount * (processingFee /100)
    const totalDownPayment =donwPayment +ProcessignFreeAmount

    console.log("TOTALdonwPayment" ,totalDownPayment)

    const P= orignalAmount 
    const R= interestRate /100
    const N= tenure

    console.log("orignalAmount",P,"interestRate",R, "tenure",N)

    const totalEmpiAMOUNT= [P * R * Math.pow(1 + R, N)]/ [Math.pow(1 + R, N)-1]

    setTotalEmIAmountPerMonth( (totalEmpiAMOUNT / ( tenure * 12)).toFixed() )

    setLoanInformation(prevLoanInfo=> {
      return {...prevLoanInfo,totalEmiAmount:totalEmpiAMOUNT.toFixed()}
    })

    console.log("totalEmpiAMOUNT",totalEmpiAMOUNT)
  }

  const handleLoanAmount=(param, value)=>{
    setLoanInformation(prevLoanInfo=> {
      return {...prevLoanInfo,[param]:value}
    })
    calculateFinalLoanAmount()
  }
  return (
      <div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px',alignItems:'center',height:"100vh",width:"100vw"}}>
        CounteDown timer -<br/>
        <div className='w_100' style={{display:'flex', flexDirection:'column',gap:'10px'}}>
            <div style={{display:'flex', flexDirection:'column',gap:'10px'}}>
              Total Amount
                <input name='totalAmount' type='number'  min={0} onChange={e=>handleLoanAmount("totalAmount", e.target.value)} 
                value={loanInformations.totalAmount}/>
              </div>
        </div>
        <div className='w_100'style={{display:'flex', flexDirection:'column',gap:'10px'}}>
          Interest
          <input name='seconds' type='number'  min={0} onChange={e=>handleLoanAmount("interestRate", e.target.value)} 
          value={loanInformations.interestRate}/>
        </div>
        <div className='w_100' style={{display:'flex', flexDirection:'column',gap:'10px'}}>
          Processing Fee
          <input name='seconds' type='number'  min={0} onChange={e=>handleLoanAmount("processingFee", e.target.value)} 
          value={loanInformations.processingFee}/>
        </div>
        <div className='w_100' style={{display:'flex', flexDirection:'column',gap:'10px'}}>
          Down Payment
          <u>Total Down Payment-{loanInformations.donwPayment}</u> 
          <input type="range" min="0" max={loanInformations.totalAmount} className="slider" onChange={e=>handleLoanAmount("donwPayment", e.target.value)}
          value={loanInformations.donwPayment}
          />
          <div className='w_100'  style={{display:'flex', gap:'10px',justifyContent:'space-between',}}> 
              <b>0</b> 
               <b>100%</b>
              {/* <b>{loanInformations.totalAmount}</b> */}
          </div>
        </div>
        <div className='w_100' style={{display:'flex', flexDirection:'column',gap:'10px'}}>
          Loan Per Month
          <u>Total Loan Payment-{loanInformations.totalEmiAmount}</u> 

          <input type="range" min="0" max={totalEmiAmountPerMonth} className="slider" onChange={e=>handleLoanAmount("usersEMiMonth", e.target.value)}
          value={loanInformations.usersEMiMonth}
          />

          <div className='w_100'  style={{display:'flex', gap:'10px',justifyContent:'space-between',}}> <b>0</b> <b>{totalEmiAmountPerMonth}</b> </div>
          
          <div style={{display:'flex', gap:'10px'}}>
              Tenure {loanInformations.tenure *12}
              <button >12</button>
              <button >24</button>
              <button >36</button>
              <button >60</button>
          </div>
        </div>
      </div>

  )
}

export default EmiCalculator
