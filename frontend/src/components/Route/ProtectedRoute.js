import React from 'react'
import { useSelector } from 'react-redux'
import {Route, useNavigate} from 'react-router-dom'

const ProtectedRoute = ({isAdmin, component:Component, }) => {
    const navigate = useNavigate()
    const {user, loading, isAuthenticated} = useSelector((state)=>state.user);

    if(loading === false){
        if(!isAuthenticated){
                return navigate('/auth/login')
        }
        if(isAdmin === true && user?.role !== 'admin'){
            return navigate('/auth/login')
        }

        return Component;
    }
 
}

export default ProtectedRoute