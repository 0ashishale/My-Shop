import React, { useEffect, useState } from 'react'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAlert } from 'react-alert';
import {useDispatch, useSelector} from 'react-redux'
import { logout, updateUserPassword } from '../../redux/action/userAction';
import { CLEAR_ERRORS } from '../../redux/constants/adminContants';
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstants';
import {useNavigate} from 'react-router-dom'


const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword]  = useState('')
    
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
   const {isUpdated, error} = useSelector((state)=>state.profile)
    const handleSubmit = (e)=>{
        e.preventDefault();  
        if(newPassword.length < 8){
            return alert.error(`Password must contain at least 8 character.`)
        }   
        if(newPassword != confirmPassword){
            return   alert.error(`New Password and Confirm Password does not matched.`)
        }
        
        //dispatch update password

        dispatch(updateUserPassword(oldPassword, newPassword))

    }

    useEffect(()=>{
            if(error){
                alert.error(error)
                dispatch({type : CLEAR_ERRORS})
            }
            if(isUpdated){
                alert.success(`Password Updated Successfully.`)
                dispatch({type : UPDATE_PASSWORD_RESET});

                
            }
    }, [error, isUpdated, error])
  return (
    <div className=''>
            <div className=' w-[100vw] mt-5 h-[100vh] overflow-hidden m-auto'>
                <Typography className='m-auto text-center p-[1.3vmax] border-b-2 border-black'>Change Password</Typography>
                <form onSubmit={handleSubmit}  className='border-2 flex flex-col m-auto p-[2vmax] justify-evenly items-center transition-all duration-500 h-[70%] mt-3 '>
                    <div className='w-72 flex items-center'>
                        <VpnKeyIcon className='absolute  translate-x-[1vmax] text-[1.6vmax]'/>
                        <input
                            className='outline-none pl-[4vmax] py-[1vmax] w-[100%] border-2 rounded-md '
                        type="password"
                        placeholder='Old Password'
                        required
                        onChange={(e)=>setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className=' flex items-center w-72'>
                        <LockOpenIcon className='absolute  translate-x-[1vmax] text-[1.6vmax]'/>
                        <input
                            className='outline-none pl-[4vmax] py-[1vmax] w-[100%] border-2 rounded-md '
                        type="password"
                        placeholder='New Password'
                        required
                        onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-72 flex items-center'>
                        <LockIcon className='absolute  translate-x-[1vmax] md:text-[1.6vmax]'/>
                        <input
                            className='outline-none pl-[4vmax] py-[1vmax] w-[100%] border-2 rounded-md '
                        type="password"
                        placeholder='Confirm Password'
                        required
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button type='submit'>
                        Change Password
                    </Button>
                    <span className='text-center text-sm text-gray-400'>Password must contain at least 8 characters.</span>

                </form>
            </div>
    </div>
  )
}

export default UpdatePassword