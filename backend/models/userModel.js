const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, {
  timestamps: true
})

// Static signup method
userSchema.statics.signup = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields are mandatory')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already exists!')
  }
  const passwordOptions = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false
  }
  if (!validator.isStrongPassword(password, passwordOptions)) {
    throw Error('Password is not strong enough. Use at least 8 characters with uppercase, lowercase, and numbers.')
  }
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ email, password: hash })
  return user
}

// Static login method — note: use statics, not static!
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields are mandatory')
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect Email')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect Password')
  }
  return user
}

module.exports = mongoose.model('User', userSchema)
