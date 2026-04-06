import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import http, { buildAuthHeaders, clearSession, getStoredToken } from '../lib/http'

const UserLogout = () => {
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    const logoutUser = async () => {
      const token = getStoredToken('user')

      try {
        if (token) {
          await http.get('/api/users/logout', {
            headers: buildAuthHeaders('user')
          })
        }
      } catch (error) {
        console.error('Logout failed:', error?.response?.data || error.message)
      } finally {
        clearSession('user')
        setUser(null)
        navigate('/login', { replace: true })
      }
    }

    logoutUser()
  }, [navigate, setUser])

  return (
    <div className='h-screen flex justify-center items-center text-lg font-semibold'>
      Logging out...
    </div>
  )
}

export default UserLogout
