const express = require('express')
const App = express()

const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3030

App.use(bodyParser.json())
App.use(cors())

const { UserRouter } = require('./routers')

App.use('/users', UserRouter)


App.listen(PORT, () => console.log("Review Backend : ", PORT))
