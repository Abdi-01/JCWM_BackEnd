const express = require('express')
const { UserController } = require('../controllers')
const router = express.Router()

router.get('/getUsers', UserController.getUsers)
router.get('/loginUsers', UserController.loginUsers)
router.post('/addUsers', UserController.addUsers)

module.exports = router