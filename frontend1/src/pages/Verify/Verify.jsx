import React, { useContext } from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Verify = () => {
    const verify=() =>{
        const[searchParams,setSearchParms]=useSearchParams();
        const success = searchParams.get("success")
        const orderId = searchParams.get("orderId")
        const{url}= useContext(StoreContext);
    }
  return (
    <div className='verify'>
        <div className="clasName spinner"></div>
      
    </div>
  )
}

export default Verify
