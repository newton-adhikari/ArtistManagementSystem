const mysql = require("mysql");

const connection = mysql.createPool({
    host      : "localhost",
    user      : "root",
    password  : "",
    database  : "ams"    
})

connection.getConnection((err, con) => {
    if (err) {
        console.log("Error connecting to the database");
        return;
    }

    console.log("Successfully connected to the database");
    con.release();
})

module.exports = connection;