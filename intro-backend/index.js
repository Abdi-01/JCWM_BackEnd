const express = require('express')
const App = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 2800

App.use(bodyParser())
App.use(cors())

const { productRouter, userRouter } = require('./router')

App.use('/product', productRouter)
App.use('/user', userRouter)

App.listen(PORT, () => console.log("RESTFull API CONNECTED :", PORT))
