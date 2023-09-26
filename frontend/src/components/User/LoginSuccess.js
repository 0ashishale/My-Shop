import React, { useEffect } from 'react'

const LoginSuccess = () => {

    
    useEffect(()=>{
      setTimeout(()=>{
            window.close();
            
            
      }, 1000)
    })
  return (
    <div>LoginSuccess</div>
  )
}

export default LoginSuccess