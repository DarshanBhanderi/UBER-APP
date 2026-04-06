const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')

const app = express()

connectToDb()

const normalizeOrigin = (origin) => (origin || '').replace(/\/+$/, '')

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    ...(process.env.ALLOWED_ORIGINS || '').split(','),
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://uber-app-seven.vercel.app'
  ]
    .map((origin) => normalizeOrigin(origin).trim())
    .filter(Boolean)
)

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true
  }

  const normalizedOrigin = normalizeOrigin(origin)

  if (allowedOrigins.has(normalizedOrigin)) {
    return true
  }

  try {
    const hostname = new URL(normalizedOrigin).hostname
    return hostname.endsWith('.vercel.app')
  } catch {
    return false
  }
}

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Backend is running')
})

app.use('/api/users', userRoutes)
app.use('/api/captains', captainRoutes)
app.use('/api/maps', mapsRoutes)
app.use('/api/rides', rideRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

module.exports = app
