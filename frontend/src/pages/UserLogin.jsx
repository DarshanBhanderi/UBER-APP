import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import http, { getApiErrorMessage, storeSession } from '../lib/http'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const response = await http.post('/api/users/login', {
        email,
        password
      })

      if (response.status === 200) {
        const { token, user } = response.data

        setUser(user)
        storeSession({ role: 'user', token, data: user })
        navigate('/home')
      }
    } catch (error) {
      const message = getApiErrorMessage(error, 'Login failed')
      setErrorMessage(message)
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s'
          alt='Logo'
        />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg'
            type='email'
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg'
            type='password'
            placeholder='password'
          />

          {errorMessage && <p className='text-red-600 text-sm mb-3'>{errorMessage}</p>}

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Login
          </button>
        </form>

        <p className='text-center'>
          New here?{' '}
          <Link to='/signup' className='text-blue-600'>
            Create new Account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
