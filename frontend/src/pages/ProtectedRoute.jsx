import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import { getStoredToken } from '../lib/http'

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserDataContext)
    const token = getStoredToken('user')
    
    if (!token || !user) {
      return <Navigate to="/login" replace />
    }
    

    return children
}

export default ProtectedRoute
