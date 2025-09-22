import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserDataContext)
    const token = localStorage.getItem('token')

    if (!token || !user) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
