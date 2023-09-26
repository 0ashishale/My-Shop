import React, { useState } from 'react'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAlert } from 'react-alert';
const UpdatePassword = () => {
    const alert = useAlert()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword]  = useState('')

   
    const handleSubmit = (e)=>{
        e.preventDefault();  
        if(newPassword.length < 8){
            return alert.error(`Password must contain at least 8 character.`)
        }   
        if(newPassword != confirmPassword){
            return   alert.error(`New Password and Confirm Password does not matched.`)
        }
        
        //dispatch update password

    }
  return (
    <div className=''>
            <div className='md:w-[25vw] w-[100vw] mt-5 h-[100vh] overflow-hidden m-auto'>
                <Typography className='m-auto text-center p-[1.3vmax] border-b-2 border-black'>Change Password</Typography>
                <form onSubmit={handleSubmit}  className='border-2 flex flex-col m-auto p-[2vmax] justify-evenly items-center transition-all duration-500 h-[70%] mt-3 '>
                    <div className='w-[100%] flex items-center'>
                        <VpnKeyIcon className='absolute  translate-x-[1vmax] text-[1.6vmax]'/>
                        <input
                            className='outline-none pl-[4vmax] py-[1vmax] w-[100%] border-2 rounded-md '
                        type="password"
                        placeholder='Old Password'
                        required
                        onChange={(e)=>setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-[100%] flex items-center'>
                        <LockOpenIcon className='absolute  translate-x-[1vmax] text-[1.6vmax]'/>
                        <input
                            className='outline-none pl-[4vmax] py-[1vmax] w-[100%] border-2 rounded-md '
                        type="password"
                        placeholder='New Password'
                        required
                        onChange={(e)=>setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className='w-[100%] flex items-center'>
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