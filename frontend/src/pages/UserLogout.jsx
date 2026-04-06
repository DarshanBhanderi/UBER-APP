// import React, { useEffect, useContext } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { UserDataContext } from '../context/UserDataContext'

// const UserLogout = () => {
//   const { setUser } = useContext(UserDataContext)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const logoutUser = async () => {
//       try {
//         const token = localStorage.getItem('token')

//         // ✅ Only call API if token exists
//         if (token) {
//           await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           })
//         }

//         // ✅ Clear local storage and context
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//         setUser(null)

//         // ✅ Redirect to login page
//         navigate('/login')
//       } catch (error) {
//         console.error('Logout failed:', error.response?.data || error.message)
//         // Even if API fails, still clear session and navigate
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//         setUser(null)
//         navigate('/login')
//       }
//     }

//     logoutUser()
//   }, [navigate, setUser])

//   return (
//     <div className='h-screen flex justify-center items-center text-lg font-semibold'>
//       Logging out...
//     </div>
//   )
// }

// export default UserLogout
import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'

const UserLogout = () => {
  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('token')

        // ✅ Call backend logout if token exists
        if (token) {
          await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/users/logout`, // ✅ correct API
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
              withCredentials: true // ✅ IMPORTANT
            }
          )
        }
      } catch (error) {
        console.error('Logout failed:', error.response?.data || error.message)
      } finally {
        // ✅ Always clear local session
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        // ✅ Clear context
        setUser(null)

        // ✅ Redirect
        navigate('/login')
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