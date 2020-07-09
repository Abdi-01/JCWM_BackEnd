const express = require('express')
const { productController } = require('../controller')
const router = express.Router()

router.get('/getDataBuah', productController.getProductBuah)

module.exports = router