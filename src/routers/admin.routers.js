
const { getUser, createUser, updateUser, removeUser, deleteMultipleUser, listuser, customClimes } = require('../controllers/admin.controller')

const router = require('express').Router()

    .post('/createuser', createUser)

    .get('/getUser/:uid', getUser)

    .get('/listuser', listuser)

    .put('/modifyUser/:uid', updateUser)

    .delete('/removeuser/:uid', removeUser)

    .delete('/deletemultipleuser', deleteMultipleUser)
    
    .put('/climetype', customClimes)


module.exports = router