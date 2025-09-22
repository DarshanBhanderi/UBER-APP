import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainDataContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCaptainProfile = async () => {
            if (!token) {
                navigate('/captain-login')
                return
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )

                if (response.status === 200) {
                    setCaptain(response.data.captain)
                } else {
                    localStorage.removeItem('token')
                    navigate('/captain-login')
                }
            } catch (err) {
                console.error('Error fetching captain profile:', err)
                localStorage.removeItem('token')
                navigate('/captain-login')
            } finally {
                setIsLoading(false)
            }
        }

        fetchCaptainProfile()
    }, [token, navigate, setCaptain])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default CaptainProtectWrapper
