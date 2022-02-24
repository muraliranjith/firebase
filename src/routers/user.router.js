
const { register, login, logout, resetPassword, loginWithGoogle, getUser, userDelete, updateUserProfile, updateUserEmail, loginGithub } = require('../controllers/user.controller')

const router = require('express').Router()

    .post('/register', register)

    .post('/login', login)

    .post('/logout', logout)

    .post('/reset', resetPassword)

    .post('/google', loginWithGoogle)

    .get('/users', getUser)

    .put('/updateuser', updateUserProfile)

    .put('/updateuseremail', updateUserEmail)

    .delete('/delete', userDelete)

    .get('/guthublogin', loginGithub)

module.exports = router