import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadUser } from '../../redux/action/userAction'

const LoginSuccess = () => {

  const dispatch = useDispatch()
    
    useEffect(()=>{
      setTimeout(()=>{
            window.close();
            dispatch(loadUser())
      }, 300)
    }, [])
  return (
    <div>LoginSuccess</div>
  )
}

export default LoginSuccess