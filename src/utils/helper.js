const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.success = (message = '', data = {}, code = 200) => {
  return {
    error: false,
    message,
    data,
    code
  }
}

exports.error = (message = '', data = {}, code = 500) => {
  return {
    error: true,
    message,
    data,
    code
  }
}

exports.validation = (data = {}) => {
  return {
    error: true,
    message: 'Bad Request',
    code: 400,
    data
  }
}

exports.JoiParseError = (error) => {
  return error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
}
exports.errorRes = (res, message = '', data = {}, code = 400) => {
  res.status(code).send({
    error: true,
    message,
    data,
    code
  })
  return;
}

exports.bycryptpassverify = async (password, hash) => {
  return await bycrypt.compare(password, hash);
}

exports.jwtSign = async (payload) => {
  return await jwt.sign(payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY })
}

exports.jwtVerify = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET)
}