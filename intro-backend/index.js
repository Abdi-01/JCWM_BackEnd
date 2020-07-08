const express = require('express')
const cors = require('cors') //library untuk memberikan izin akses GET, POST, PUT, DELETE
const bodyParser = require('body-parser')//menerjemahkan data dari request body

const fs = require('fs')
const PORT = 4000

const app = express()

app.use(bodyParser())
app.use(cors())

let data = [
    {
        "nama": "Kurma",
        "harga": 10000
    },
    {
        "nama": "Semangka",
        "harga": 5000
    },
    {
        "nama": "Jeruk",
        "harga": "4000"
    },
    {
        "nama": "Jeruk",
        "harga": "4000"
    }
]

let dbsepatu = fs.readFileSync('./data/db.json').toString()
app.get('/', (req, res) => {
    res.status(200).send('<h2>HaloExpress</h2>')
})

app.get('/sepatu', (req, res) => {
    let productSepatu = JSON.parse(dbsepatu).products
    let newData = JSON.stringify(data)
    fs.writeFileSync('./data/write.json', newData)
    res.status(200).send(productSepatu)
})

app.get('/userTransaction', (req, res) => {
    let userTrans = JSON.parse(dbsepatu).userTransaction
    res.status(200).send(userTrans)
})

app.get('/product', (req, res) => {

})

app.post('/input', (req, res) => {

})

app.patch('/editProduk', (req, res) => {
    data[req.body.id].nama = req.body.name

    res.status(200).send(data)
})

app.listen(PORT, () => console.log('Express Connected PORT : ', PORT))