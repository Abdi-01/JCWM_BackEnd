const db = require('../sql')
const CryptoJS = require('crypto-js')
var SHA256 = require("crypto-js/sha256");

module.exports = {
    getUsers: (req, res) => {
        console.log(SHA256("Message").toString());
    }
}