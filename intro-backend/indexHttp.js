const http = require('http')//mengimport module http
const fs = require('fs')//akses file atau menghubungkan file atau memanggil file
const url = require('url')
const port = 2600

const server = http.createServer((req, res) => {
    console.log("URL :", req.url)//url lokasi data diambil
    console.log("Headers :", req.headers)
    if (req.url === '/users') {
        var data = {
            nama: 'Al',
            jabatan: 'Direktur'
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
    } else if (req.url === '/products') {
        var products = fs.readFileSync('product.json', 'utf8', () => {
            console.log('Data Access Succsessful')
        })
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(products)
    } else if (req.url === '/productSepatu') {
        var dbproduct = fs.readFileSync('db.json').toString()
        // console.log(JSON.stringify(dbproduct))
        var data = JSON.parse(dbproduct).products
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))
    } else if (req.url === '/profile') {
        let body = [];
        req.on('data', (chunk) => {
            console.log("Chunk :", chunk)
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            console.log("Body :", body)
            res.writeHead(200, { 'Content-Type': 'text/html' }) //200 adalah status code
            res.write(`Data ${body}`)
            res.end()//res.end = yang akan ditampilkan ke browser apa
            // at this point, `body` has the entire request body stored in it as a string
        });
    }
    else {
        var notfoundPage = fs.readFileSync('index.html', 'utf8', () => {
            console.log('Data Access Succsessful')
        })
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write(notfoundPage)
        res.end()
    }

    //Menerima data dari request query
    // const queryObj = url.parse(req.url, true).query 
    // console.log(url.parse(req.url, true))
    // console.log("query :", queryObj.data)

    //Menerima request dengan POST
    // let body = [];
    // req.on('data', (chunk) => {
    //     console.log("Chunk :", chunk)
    //     body.push(chunk);
    // }).on('end', () => {
    //     body = Buffer.concat(body).toString();
    //     console.log("Body :", body)
    //     res.writeHead(200, { 'Content-Type': 'text/html' }) //200 adalah status code
    //     res.write(body)
    //     res.end()//res.end = yang akan ditampilkan ke browser apa
    //     // at this point, `body` has the entire request body stored in it as a string
    // });
})

server.listen(port)//port berapa server dijalankan
console.log(`Listening at port ${port}`)