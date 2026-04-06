import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserDataContext'
import http, {
  getApiErrorMessage,
  mapValidationErrors,
  storeSession
} from '../lib/http'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (event) => {
    event.preventDefault()
    setFieldErrors({})
    setErrorMessage('')

    try {
      const response = await http.post('/api/users/register', {
        fullname: {
          firstname: firstName.trim(),
          lastname: lastName.trim()
        },
        email: email.trim(),
        password
      })

      if (response.status === 201) {
        const { token, user } = response.data

        setUser(user)
        storeSession({ role: 'user', token, data: user })
        navigate('/home')
      }
    } catch (error) {
      const backendErrors = error?.response?.data?.errors

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        const mapped = mapValidationErrors(backendErrors)

        setFieldErrors({
          firstName: mapped['fullname.firstname'],
          lastName: mapped['fullname.lastname'],
          email: mapped.email,
          password: mapped.password
        })
        return
      }

      setErrorMessage(getApiErrorMessage(error, 'Signup failed'))
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-16 mb-10'
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s'
          alt='logo'
        />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-2'>
            <div className='w-1/2'>
              <input
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${
                  fieldErrors.firstName ? 'border-red-500' : ''
                }`}
                type='text'
                placeholder='First name'
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
              {fieldErrors.firstName && (
                <p className='text-red-500 text-sm mt-1'>{fieldErrors.firstName}</p>
              )}
            </div>

            <div className='w-1/2'>
              <input
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${
                  fieldErrors.lastName ? 'border-red-500' : ''
                }`}
                type='text'
                placeholder='Last name'
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              {fieldErrors.lastName && (
                <p className='text-red-500 text-sm mt-1'>{fieldErrors.lastName}</p>
              )}
            </div>
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            className={`bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg ${
              fieldErrors.email ? 'border-red-500' : ''
            }`}
            type='email'
            placeholder='email@example.com'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {fieldErrors.email && <p className='text-red-500 text-sm mb-2'>{fieldErrors.email}</p>}

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            className={`bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg ${
              fieldErrors.password ? 'border-red-500' : ''
            }`}
            type='password'
            placeholder='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {fieldErrors.password && (
            <p className='text-red-500 text-sm mb-2'>{fieldErrors.password}</p>
          )}

          {errorMessage && <p className='text-red-600 text-sm mb-3'>{errorMessage}</p>}

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Create account
          </button>
        </form>

        <p className='text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600'>
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the{' '}
          <span className='underline'>Google Privacy Policy</span> and{' '}
          <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
