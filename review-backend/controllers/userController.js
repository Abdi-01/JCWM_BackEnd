//🟡import database connection
const db = require('../database')

//🟡import crypto dari node.js untuk membuat enkripsi password 
const Crypto = require('crypto')

//🟡 Export fungsi yang akan digunakan untuk mengeksekusi data
module.exports = {
    //🟡 Fungsi get semua data users
    getUsers: (req, res) => {
        //🟡 Deklarasi perintah query MySQL Get
        let sqlGet = `SELECT * FROM tb_users u join tb_address a on u.id = a.userId ;`

        //🟡 Fungsi query dengan 2 parameter yaitu perintah query dan callback function
        db.query(sqlGet, (err, results) => {

            //🟡 Kondisi jika query gagal atau error
            if (err) {
                //🔴 Kode pesan yg dikirim ke front-end jika query gagal atau error
                //🟡 Data yg dikirim bisa berupa object, array, number, string tergantung kebutuhan
                res.status(500).send(err)
            }

            //🟢 Kode pesan yg dikirim ke front-end jika query berhasil
            res.status(200).send(results)
        })
    },
    //🟡 Fungsi add users atau register
    addUsers: (req, res) => {
        //🟡 Mengecek data yang dikirim oleh front-end melalui req.body
        console.log(req.body)

        //🟡 Membuat hashpassword yang terenkripsi
        //🟡 Terdiri dari  => ---fungsi hash --- (algorithm methode,key)-----(password dri FE + keyTambahan)---(Kodenya hexa)
        let hashPassword = Crypto.createHash("sha256", "keykeyAde").update(req.body.password + "WARUNG").digest("hex")
        //🟡 Memeriksa hasil enkripsi
        console.log(hashPassword)

        //🟡 Deklarasi perintah query insert ke tb_users
        //🟡 db.escape(datanya apa) ==> berfungsi untuk mengidentifikasi secara otomatis apakah data pada query berupa STRING atau NUMBER
        let sqlAdd = `Insert into tb_users (username,email,password,phone,gender) 
        values (${db.escape(req.body.name)},${db.escape(req.body.email)},${db.escape(hashPassword)},${db.escape(req.body.phone)},${db.escape(req.body.gender)});`

        //🟡 Validasi sederhana untuk pengecekan email, jika benar maka fungsi query di eksekusi
        if (req.body.email.includes('@')) {
            db.query(sqlAdd, (err, results) => {
                if (err) {
                    res.status(500).send(err)
                }
                console.log(results)
                // 🟡 results.insertId didapat jika eksekusi query insert berhasil dilakukan
                if (results.insertId > 0) {
                    let sqlAddress = `Insert into tb_address (userId,address) values (${db.escape(results.insertId)},${db.escape(req.body.address)});`
                    db.query(sqlAddress, (errAddress, resultsAddress) => {
                        if (err) {
                            res.status(500).send(errAddress)
                        }
                        //🟡 Kode pesan yang dikirim ke front-end berupa data STRING
                        res.status(200).send("Register Success")
                    })
                }
            })
        } else {
            res.status(500).send('Your email wrong')
        }
        //🔴 INGAT kode pesan yang dikirim ke front end harus SATU pesan(res.status(kode).send(data yg dikirim)),JANGAN DOUBLE
    },
    loginUsers: (req, res) => {
        //Sebelum login password dari front-end perlu dihash / enkripsi kembali, sesuai dengan susunan crypto saat register
        //Karena pada register dan login hanya membutuhkan ENKRIPSI tidak perlu DEKRIPSI
        let hashPassword = Crypto.createHash("sha256", "keykeyAde").update(req.body.password + "WARUNG").digest("hex")
        let sqlGet = `Select * from tb_users where username = ${db.escape(req.body.username)} and password = ${db.escape(hashPassword)};`
        db.query(sqlGet, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },

}