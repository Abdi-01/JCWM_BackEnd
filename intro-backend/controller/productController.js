const db = require('../sql')

module.exports = {
    getProduct: (req, res) => {
        let sqlGet = 'Select * from tb_product;'
        db.query(sqlGet, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    getCategory: (req, res) => {
        let sqlGet = 'Select * from tb_category;'
        db.query(sqlGet, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    },
    addProduct: (req, res) => {
        let sqlAdd = `Insert Into tb_product (image,name,description,category,price) 
        values (${db.escape(req.body.image), db.escape(req.body.name), db.escape(req.body.description), db.escape(req.body.category), db.escape(req.body.price)})`
        db.query(sqlAdd, (err, results) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(results)
        })
    }
}