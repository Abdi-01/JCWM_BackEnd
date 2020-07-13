const fs = require('fs')
const db = require('../sql')
let dataBuah = JSON.parse(fs.readFileSync('./data/write.json').toString())  // membaca file sekaligus menjadikannya ke format JSON dengan JSON.parse(string data yg dirubah ke JSON), sehingga dapat mengakses property didalamnya
module.exports = {
    getProduct: (req, res) => {
        // res.status(200).send(dataBuah.product)
        let sqlGet = 'Select * from tb_product;'
        // console.log(res.query)
        db.query(sqlGet, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getCategory: (req, res) => {
        let sqlGet = 'Select * from tb_category;'
        // console.log(res.query)
        db.query(sqlGet, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    }
}