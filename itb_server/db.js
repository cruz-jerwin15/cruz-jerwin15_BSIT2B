const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'',
    database:'db_faith',
    waitForConnections:true,
    connectionLimit:10,
    queue:0
})

module.exports = pool.promise();