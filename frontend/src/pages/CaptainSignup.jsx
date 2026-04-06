import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainDataContext'
import http, {
  getApiErrorMessage,
  mapValidationErrors,
  storeSession
} from '../lib/http'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    setFieldErrors({})
    setErrorMessage('')

    try {
      const response = await http.post('/api/captains/register', {
        fullname: {
          firstname: firstName.trim(),
          lastname: lastName.trim()
        },
        email: email.trim(),
        password,
        vehicle: {
          color: vehicleColor.trim(),
          plate: vehiclePlate.trim(),
          capacity: Number(vehicleCapacity),
          vehicleType
        }
      })

      if (response.status === 201) {
        const { token, captain } = response.data

        setCaptain(captain)
        storeSession({ role: 'captain', token, data: captain })
        resetForm()
        navigate('/captain-home')
      }
    } catch (error) {
      const backendErrors = error?.response?.data?.errors

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        const mapped = mapValidationErrors(backendErrors)

        setFieldErrors({
          firstName: mapped['fullname.firstname'],
          lastName: mapped['fullname.lastname'],
          email: mapped.email,
          password: mapped.password,
          color: mapped['vehicle.color'],
          plate: mapped['vehicle.plate'],
          capacity: mapped['vehicle.capacity'],
          vehicleType: mapped['vehicle.vehicleType']
        })
        return
      }

      setErrorMessage(getApiErrorMessage(error, 'Captain signup failed'))
    }
  }

  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img
          className='w-20 mb-3'
          src='https://www.svgrepo.com/show/505031/uber-driver.svg'
          alt='Captain Logo'
        />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
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

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={`bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg ${
              fieldErrors.email ? 'border-red-500' : ''
            }`}
            type='email'
            placeholder='email@example.com'
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
          {fieldErrors.password && <p className='text-red-500 text-sm mb-2'>{fieldErrors.password}</p>}

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-2'>
            <div className='w-1/2'>
              <input
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${
                  fieldErrors.color ? 'border-red-500' : ''
                }`}
                type='text'
                placeholder='Vehicle Color'
                value={vehicleColor}
                onChange={(event) => setVehicleColor(event.target.value)}
              />
              {fieldErrors.color && <p className='text-red-500 text-sm mt-1'>{fieldErrors.color}</p>}
            </div>
            <div className='w-1/2'>
              <input
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${
                  fieldErrors.plate ? 'border-red-500' : ''
                }`}
                type='text'
                placeholder='Vehicle Plate'
                value={vehiclePlate}
                onChange={(event) => setVehiclePlate(event.target.value)}
              />
              {fieldErrors.plate && <p className='text-red-500 text-sm mt-1'>{fieldErrors.plate}</p>}
            </div>
          </div>

          <div className='flex gap-4 mb-2'>
            <div className='w-1/2'>
              <input
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${
                  fieldErrors.capacity ? 'border-red-500' : ''
                }`}
                type='number'
                min='1'
                placeholder='Vehicle Capacity'
                value={vehicleCapacity}
                onChange={(event) => setVehicleCapacity(event.target.value)}
              />
              {fieldErrors.capacity && (
                <p className='text-red-500 text-sm mt-1'>{fieldErrors.capacity}</p>
              )}
            </div>

            <div className='w-1/2'>
              <select
                required
                className={`bg-[#eeeeee] w-full rounded-lg px-4 py-2 border text-lg ${
                  fieldErrors.vehicleType ? 'border-red-500' : ''
                }`}
                value={vehicleType}
                onChange={(event) => setVehicleType(event.target.value)}
              >
                <option value='' disabled>
                  Select Vehicle Type
                </option>
                <option value='car'>Car</option>
                <option value='auto'>Auto</option>
                <option value='motorcycle'>Motorcycle</option>
              </select>
              {fieldErrors.vehicleType && (
                <p className='text-red-500 text-sm mt-1'>{fieldErrors.vehicleType}</p>
              )}
            </div>
          </div>

          {errorMessage && <p className='text-red-600 text-sm mb-3'>{errorMessage}</p>}

          <button
            type='submit'
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          >
            Create Captain Account
          </button>
        </form>

        <p className='text-center'>
          Already have an account?{' '}
          <Link to='/captain-login' className='text-blue-600'>
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className='text-[10px] mt-6 leading-tight'>
          This site is protected by reCAPTCHA and the{' '}
          <span className='underline'>Google Privacy Policy</span> and{' '}
          <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
