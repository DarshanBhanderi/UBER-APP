const socketIo = require('socket.io')
const userModel = require('./models/user.model')
const captainModel = require('./models/captain.model')

let io

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

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
          callback(null, true)
          return
        }

        callback(new Error('Not allowed by CORS'))
      },
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`)

    socket.on('join', async (data) => {
      const { userId, userType } = data

      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id })
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })
      }
    })

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data

      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' })
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng
        }
      })
    })

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`)
    })
  })
}

const sendMessageToSocketId = (socketId, messageObject) => {
  if (!io || !socketId) {
    return
  }

  io.to(socketId).emit(messageObject.event, messageObject.data)
}

module.exports = { initializeSocket, sendMessageToSocketId }
