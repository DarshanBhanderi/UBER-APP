import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainDataContext'
import http, { buildAuthHeaders, clearSession, getStoredToken } from '../lib/http'

const CaptainLogout = () => {
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)

  useEffect(() => {
    const logoutCaptain = async () => {
      const token = getStoredToken('captain')

      try {
        if (token) {
          await http.get('/api/captains/logout', {
            headers: buildAuthHeaders('captain')
          })
        }
      } catch (error) {
        console.error('Captain logout failed:', error?.response?.data || error.message)
      } finally {
        clearSession('captain')
        setCaptain(null)
        navigate('/captain-login', { replace: true })
      }
    }

    logoutCaptain()
  }, [navigate, setCaptain])

  return (
    <div className='h-screen flex justify-center items-center text-lg font-semibold'>
      Logging out...
    </div>
  )
}

export default CaptainLogout
