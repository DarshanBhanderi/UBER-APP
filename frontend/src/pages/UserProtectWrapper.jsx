import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import http, {
  buildAuthHeaders,
  clearSession,
  getStoredToken,
  storeSession
} from '../lib/http'

const UserProtectWrapper = ({ children }) => {
  const token = getStoredToken('user')
  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        clearSession('user')
        setUser(null)
        navigate('/login', { replace: true })
        return
      }

      try {
        const response = await http.get('/api/users/profile', {
          headers: buildAuthHeaders('user')
        })

        if (response.status === 200) {
          setUser(response.data)
          storeSession({ role: 'user', data: response.data })
        }
      } catch {
        clearSession('user')
        setUser(null)
        navigate('/login', { replace: true })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate, setUser, token])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default UserProtectWrapper
