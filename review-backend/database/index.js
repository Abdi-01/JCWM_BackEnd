const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'AL',
    password: '007@001',
    database: 'db_warung',
    port: 3306,
    multipleStatements: true
})

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server');
});

module.exports = db