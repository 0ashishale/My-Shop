import React, { useEffect } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtp } from '../../redux/action/userAction'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { VERIFY_OTP_RESET } from '../../redux/constants/userConstants'


const VerifyOtp = () => {
    const [otp, setOtp] = React.useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const alert = useAlert()
const navigate = useNavigate()
    const params = new URLSearchParams(location.search)

    const email = params.get('email') || ''
   
    const {isVerified, loading} = useSelector(state=>state.otp)

    const handleChange = (newValue) => {
        
      setOtp(newValue)
    }
    const handleOtpSubmit = (e)=>{
        e.preventDefault();
      dispatch(verifyOtp(email, otp))
      navigate(`/auth/login`)
    }

    useEffect(()=>{
        if(isVerified){
            alert.success(`Email is verified.`)
            dispatch({type : VERIFY_OTP_RESET})

        }
    }, [dispatch, isVerified])
  return (
    <div className='h-[100vh] w-[100vw] max-w-[1920px]'>
        <div className='flex flex-col gap-5 justify-center items-center h-full w-72 mx-auto'>
        <Typography variant="h6">Enter OTP</Typography>

        <MuiOtpInput type='number' value={otp} onChange={handleChange}  />

        <Button
        onClick={handleOtpSubmit} disabled={loading ? true : false}
         className='!bg-orange-300 !text-black !px-4 '>Verify</Button>
        </div>
    </div>
  )
}

export default VerifyOtp