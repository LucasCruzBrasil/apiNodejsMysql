const mysql = require('mysql');

var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.Mysql_PORT,
    "url": process.env.URL_API
})

exports.execute = (query, paramns = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, paramns, (error, result, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        });
    }

    )
}
exports.pool = pool;