import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

const ProtectedRoutesAdmin = () => {
    const{loading, isAuthenticated, user} = useAuth()
    if (loading) return <h1>
      Loading...
    </h1>
    if(!isAuthenticated || isAuthenticated && user.admin==false) return <Navigate to='/' replace/>

    return (
        <Outlet/>
    )
}

export default ProtectedRoutesAdmin