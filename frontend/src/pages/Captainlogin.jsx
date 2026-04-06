import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainDataContext'
import http, { getApiErrorMessage, storeSession } from '../lib/http'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const response = await http.post('/api/captains/login', {
        email,
        password
      })

      if (response.status === 200) {
        const { token, captain } = response.data

        setCaptain(captain)
        storeSession({ role: 'captain', token, data: captain })
        navigate('/captain-home')
      }
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Captain login failed'))
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-20 mb-3'
          src='https://www.svgrepo.com/show/505031/uber-driver.svg'
          alt='Captain Logo'
        />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            type='email'
            placeholder='email@example.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            type='password'
            placeholder='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg'
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
          Join a fleet?{' '}
          <Link to='/captain-signup' className='text-blue-600'>
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
