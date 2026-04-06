import React, { useEffect, useState } from 'react'
import { CaptainDataContext } from './CaptainDataContext'
import { getStoredSessionData } from '../lib/http'

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const savedCaptain = getStoredSessionData('captain')

    if (savedCaptain) {
      setCaptain(savedCaptain)
    }
  }, [])

  const updateCaptain = (captainData) => setCaptain(captainData)

  return (
    <CaptainDataContext.Provider
      value={{ captain, setCaptain, isLoading, setIsLoading, error, setError, updateCaptain }}
    >
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
