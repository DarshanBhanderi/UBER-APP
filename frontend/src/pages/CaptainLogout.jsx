// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const CaptainLogout = () => {
//     const navigate = useNavigate()
//     const token = localStorage.getItem('captain-token') // ✅ same key

//     useEffect(() => {
//         const logoutCaptain = async () => {
//             try {
//                 await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/logout`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 })
//             } catch (err) {
//                 console.error('Logout error:', err)
//             } finally {
//                 localStorage.removeItem('captain-token') // ✅ same key
//                 navigate('/captain-login')
//             }
//         }
//         logoutCaptain()
//     }, [navigate, token])

//     return <div>Logging out...</div>
// }

// export default CaptainLogout

import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainDataContext'

const CaptainLogout = () => {
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const token = localStorage.getItem('captain-token')

        // ✅ Call backend logout if token exists
        if (token) {
          await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/captains/logout`, // ✅ correct API
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
              withCredentials: true // ✅ IMPORTANT
            }
          )
        }
      } catch (err) {
        console.error('Captain logout error:', err.response?.data || err.message)
      } finally {
        // ✅ Always clear local session
        localStorage.removeItem('captain-token')
        localStorage.removeItem('captain')

        // ✅ Clear context
        setCaptain(null)

        // ✅ Redirect
        navigate('/captain-login')
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