import axios from 'axios'

const USER_TOKEN_KEY = 'token'
const USER_DATA_KEY = 'user'
const CAPTAIN_TOKEN_KEY = 'captain-token'
const CAPTAIN_DATA_KEY = 'captain'

const normalizeBaseUrl = (url = '') => url.replace(/\/+$/, '')

const getBaseUrl = () => normalizeBaseUrl(import.meta.env.VITE_BASE_URL || '')

const http = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getTokenKeyByRole = (role) =>
  role === 'captain' ? CAPTAIN_TOKEN_KEY : USER_TOKEN_KEY

const getDataKeyByRole = (role) =>
  role === 'captain' ? CAPTAIN_DATA_KEY : USER_DATA_KEY

export const getStoredToken = (role = 'user') =>
  localStorage.getItem(getTokenKeyByRole(role))

export const getStoredSessionData = (role = 'user') => {
  const key = getDataKeyByRole(role)
  const value = localStorage.getItem(key)

  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    localStorage.removeItem(key)
    return null
  }
}

export const storeSession = ({ role = 'user', token, data }) => {
  if (token) {
    localStorage.setItem(getTokenKeyByRole(role), token)
  }

  if (data) {
    localStorage.setItem(getDataKeyByRole(role), JSON.stringify(data))
  }
}

export const clearSession = (role = 'user') => {
  localStorage.removeItem(getTokenKeyByRole(role))
  localStorage.removeItem(getDataKeyByRole(role))
}

export const buildAuthHeaders = (role = 'user', extraHeaders = {}) => {
  const token = getStoredToken(role)

  if (!token) {
    return extraHeaders
  }

  return {
    ...extraHeaders,
    Authorization: `Bearer ${token}`
  }
}

export const mapValidationErrors = (errors = []) => {
  const mappedErrors = {}

  errors.forEach((errorItem) => {
    const fieldPath = errorItem.path || errorItem.param

    if (!fieldPath) return

    mappedErrors[fieldPath] = errorItem.msg
  })

  return mappedErrors
}

export const getApiErrorMessage = (error, fallbackMessage = 'Request failed') => {
  const responseData = error?.response?.data

  if (responseData?.message) {
    return responseData.message
  }

  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    return responseData.errors[0]?.msg || fallbackMessage
  }

  return error?.message || fallbackMessage
}

export default http
