const { validationResult } = require('express-validator')
const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const blackListTokenModel = require('../models/blacklistToken.model')

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000
})

module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password, vehicle } = req.body

    const existingCaptain = await captainModel.findOne({ email })

    if (existingCaptain) {
      return res.status(400).json({ message: 'Captain already exist' })
    }

    const hashedPassword = await captainModel.hashPassword(password)

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType
    })

    const token = captain.generateAuthToken()

    res.cookie('token', token, getCookieOptions())

    return res.status(201).json({ token, captain })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Captain registration failed' })
  }
}

module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const captain = await captainModel.findOne({ email }).select('+password')

    if (!captain) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await captain.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = captain.generateAuthToken()

    res.cookie('token', token, getCookieOptions())

    return res.status(200).json({ token, captain })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Captain login failed' })
  }
}

module.exports.getCaptainProfile = async (req, res) => {
  return res.status(200).json({ captain: req.captain })
}

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]

  if (token) {
    await blackListTokenModel.create({ token })
  }

  res.clearCookie('token', getCookieOptions())

  return res.status(200).json({ message: 'Logout successfully' })
}
