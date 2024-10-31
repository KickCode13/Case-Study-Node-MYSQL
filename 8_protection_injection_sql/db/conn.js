import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "msql_node",

})

export default pool;