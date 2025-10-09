import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('captain-token') // ✅ same key

    useEffect(() => {
        const logoutCaptain = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } catch (err) {
                console.error('Logout error:', err)
            } finally {
                localStorage.removeItem('captain-token') // ✅ same key
                navigate('/captain-login')
            }
        }
        logoutCaptain()
    }, [navigate, token])

    return <div>Logging out...</div>
}

export default CaptainLogout
