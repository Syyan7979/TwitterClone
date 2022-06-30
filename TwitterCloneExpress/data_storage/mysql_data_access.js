const mysql = require('mysql2');

const pool =  mysql.createPool({
    host: process.env.DB_HOST,
    user : 'root',
    database : 'TwitterCloneDB',
    port : '3306',
    password : 'Gengwapa7979'
});

module.exports = pool.promise();    