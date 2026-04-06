import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainDataContext'
import http, {
  buildAuthHeaders,
  clearSession,
  getStoredToken,
  storeSession
} from '../lib/http'

const CaptainProtectWrapper = ({ children }) => {
  const token = getStoredToken('captain')
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (!token) {
        clearSession('captain')
        setCaptain(null)
        navigate('/captain-login', { replace: true })
        return
      }

      try {
        const response = await http.get('/api/captains/profile', {
          headers: buildAuthHeaders('captain')
        })

        if (response.status === 200) {
          setCaptain(response.data.captain)
          storeSession({ role: 'captain', data: response.data.captain })
        }
      } catch {
        clearSession('captain')
        setCaptain(null)
        navigate('/captain-login', { replace: true })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCaptainProfile()
  }, [navigate, setCaptain, token])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default CaptainProtectWrapper
