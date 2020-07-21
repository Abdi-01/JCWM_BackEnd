const express = require('express')
const { userController } = require('../controller')
const router = express.Router()

router.get('/getUsers', userController.getUsers)

module.exports = router