const { validationResult } = require('express-validator')
const userModel = require('../models/user.model')
const userService = require('../services/user.service')
const blackListTokenModel = require('../models/blacklistToken.model')

const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000
})

module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password } = req.body

    const existingUser = await userModel.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exist' })
    }

    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword
    })

    const token = user.generateAuthToken()

    res.cookie('token', token, getCookieOptions())

    return res.status(201).json({ token, user })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Registration failed' })
  }
}

module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = user.generateAuthToken()

    res.cookie('token', token, getCookieOptions())

    return res.status(200).json({ token, user })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Login failed' })
  }
}

module.exports.getUserProfile = async (req, res) => {
  return res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]

  if (token) {
    await blackListTokenModel.create({ token })
  }

  res.clearCookie('token', getCookieOptions())

  return res.status(200).json({ message: 'Logged out' })
}
