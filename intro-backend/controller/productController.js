const fs = require('fs')
let dataBuah = JSON.parse(fs.readFileSync('./data/write.json').toString())  // membaca file sekaligus menjadikannya ke format JSON dengan JSON.parse(string data yg dirubah ke JSON), sehingga dapat mengakses property didalamnya
module.exports = {
    getProductBuah: (req, res) => {
        res.status(200).send(dataBuah.product)
    }
}