const express = require('express')
const cors = require('cors') //library untuk memberikan izin akses GET, POST, PUT, DELETE
const bodyParser = require('body-parser')//menerjemahkan data dari request body

const fs = require('fs') //untuk mengambil file utamanya read atau write
const PORT = 4000

const app = express()

app.use(bodyParser()) //menerjemahkan data request user apakah berupa JSON,raw,text
app.use(cors()) //membatasi url yg bisa mengakses file back end. jika tidak di isi berarti semua url yg meminta akses akan diberi izib

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

let dbsepatu = fs.readFileSync('./data/db.json').toString() //readfileSync : membaca file yg dipilih sesuai PATH atau lokasi filenya. Data yg dibaca berupa buffer dan dirubah ke string terlebih dahulu
let tempData = JSON.parse(fs.readFileSync('./data/write.json').toString())  // membaca file sekaligus menjadikannya ke format JSON dengan JSON.parse(string data yg dirubah ke JSON), sehingga dapat mengakses property didalamnya

//Parameter route GET,PUT,POST,PATCH dan DELETE dari expressJS pasti dua yaitu app.routenya(pathroute, cb(req,res)=>{})
//route get, untuk menandai bahwa request yg diminta adalah GET data
app.get('/', (req, res) => { 
    //res : menandai response yg akan dikirim, status : menunjukkan status code dari response, dan send: menunjukkan data apa yg dikirim ke user
    res.status(200).send('<h2>HaloExpress</h2>')
})

app.get('/sepatu', (req, res) => {
    //JSON.parse(data yg dirubah): digunakan untuk merubah data string menjadi format JSON
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

app.post('/addProduct', (req, res) => {
    tempData.push(req.body)
    fs.writeFileSync('./data/write.json', JSON.stringify(tempData))
    res.status(200).send(tempData)
})

app.patch('/editProduct/:id', (req, res) => {
    // tempData.product[req.params.id] = req.body
    for (let prop in tempData.product[req.params.id]) {
        console.log("test1", tempData.product[req.params.id][prop])
        for (let bodyProp in req.body) {
            console.log("test2", bodyProp)
            if (prop == bodyProp) {
                tempData.product[req.params.id][prop] = req.body[bodyProp]
            }
        }
    }
    res.status(200).send(tempData)
})

app.listen(PORT, () => console.log('Express Connected PORT : ', PORT))