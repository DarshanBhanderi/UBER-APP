import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainDataContext'
import http, { buildAuthHeaders, getApiErrorMessage } from '../lib/http'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!socket || !captain?._id) {
      return
    }

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (!navigator.geolocation) {
        return
      }

      navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('update-location-captain', {
          userId: captain._id,
          location: {
            ltd: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      })
    }

    const handleNewRide = (data) => {
      setRide(data)
      setRidePopupPanel(true)
    }

    const locationInterval = setInterval(updateLocation, 10000)

    updateLocation()
    socket.on('new-ride', handleNewRide)

    return () => {
      clearInterval(locationInterval)
      socket.off('new-ride', handleNewRide)
    }
  }, [captain?._id, socket])

  const confirmRide = async () => {
    if (!ride?._id) {
      return
    }

    setErrorMessage('')

    try {
      await http.post(
        '/api/rides/confirm',
        {
          rideId: ride._id,
          captainId: captain?._id
        },
        {
          headers: buildAuthHeaders('captain')
        }
      )

      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, 'Unable to confirm ride'))
    }
  }

  useGSAP(
    () => {
      gsap.to(ridePopupPanelRef.current, {
        transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
      })
    },
    [ridePopupPanel]
  )

  useGSAP(
    () => {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
      })
    },
    [confirmRidePopupPanel]
  )

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img
          className='w-16'
          src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
          alt='Uber'
        />
        <Link to='/captain/logout' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img
          className='h-full w-full object-cover'
          src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'
          alt='Map'
        />
      </div>

      <div className='h-2/5 p-6'>
        <CaptainDetails />
        {errorMessage && <p className='text-red-600 text-sm mt-2'>{errorMessage}</p>}
      </div>

      <div
        ref={ridePopupPanelRef}
        className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
