import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainDataContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const { setCaptain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/captain-login')
            return
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (response.status === 200) {
                    setCaptain(response.data.captain)
                } else {
                    localStorage.removeItem('token')
                    navigate('/captain-login')
                }
            } catch {
                localStorage.removeItem('token')
                navigate('/captain-login')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [navigate, setCaptain])

    if (isLoading) return <div>Loading...</div>

    return <>{children}</>
}

export default CaptainProtectWrapper
