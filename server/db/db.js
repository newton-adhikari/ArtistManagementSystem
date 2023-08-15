const mysql = require("mysql");

const connection = mysql.createPool({
    host:                  process.env.DB_HOST || "localhost", 
    user:                  process.env.DB_USERNAME || "root", 
    password:              process.env.DB_PASSWORD || "",
    database:              process.env.DB_DBNAME || "ams",
    waitForConnections:    true,
    connectionLimit:       10,
    queueLimit:            0
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