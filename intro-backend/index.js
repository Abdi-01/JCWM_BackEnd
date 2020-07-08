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
    res.status(200).send('<h2>HaloExpress</h2>') //data yg dikirm berupa string dengan format html, jadi browser akan otomatis men-Generate menjadi HTML
})

app.get('/getProductSepatu', (req, res) => {
    //JSON.parse(data yg dirubah): digunakan untuk merubah data string menjadi format JSON
    let productSepatu = JSON.parse(dbsepatu).products
    res.status(200).send(productSepatu)
})

app.get('/getBuah', (req, res) => {
    res.status(200).send(tempData.product)
})

app.get('/userTransaction', (req, res) => {
    let userTrans = JSON.parse(dbsepatu).userTransaction
    res.status(200).send(userTrans)
})

app.get('/getUser', (req, res) => {
    res.status(200).send(tempData.user)
})

app.post('/addProduct', (req, res) => {
    tempData.push(req.body)
    //JSON.stringify(data yg dirubah): digunakan untuk merubah data JSON menjadi format JSON string sebelum ditulis ke file write.json
    //fs.writeFileSync : Menulis data ke file write.json
    //Data yg ditulis ke file .json, harus diconvert dengan JSON.stringfy, agar setiap propertinya terbaca. Jika tidak hasilnya akan error 
    fs.writeFileSync('./data/write.json', JSON.stringify(tempData))
    //Setelah ditulis, data terbaru dikirim kembali ke user
    res.status(200).send(tempData)
})

app.patch('/editProduct/:id', (req, res) => {
    //Looping yg ditujukan untuk mencari kecocokan nama property yg akan di edit, sehingga dari USER cukup mengirim object sesuai nama property yg dituju.
    // Jika nama property sama, maka data akan langsung diganti
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