const express = require('express')
const { productController } = require('../controller')
const router = express.Router()

router.get('/getProduct', productController.getProduct)
router.get('/getCategory', productController.getCategory)

module.exports = router