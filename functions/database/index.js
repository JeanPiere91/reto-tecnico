const mysql = require('mysql2');

const {MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_CONNECTION_LIMIT, MYSQL_QUEUE_LIMIT} = require('../config');

const dbConfig = {
    host            : MYSQL_HOST,
    database        : MYSQL_DATABASE,
    user            : MYSQL_USER,
    password        : MYSQL_PASSWORD,
    connectionLimit : MYSQL_CONNECTION_LIMIT,
    waitForConnections: true,
    queueLimit: MYSQL_QUEUE_LIMIT,
    debug: false
};

const pool = mysql.createPool(dbConfig);

const queryProcedure = async (procedure, parameters = []) => {
    var conn = null
    try {
        let query = `CALL ${procedure}`
        conn = await pool.promise().getConnection();
        const [rows, fields] = await conn.execute(query, parameters)
        return { status:true, data: rows}
    }catch (error) {
        console.log("Mysql Error ", error)
        return { status:false, data: error}
    }finally{
        if(conn){
            conn.release()
        }
    }
}

const querySql = async (query, parameters = []) => {
    var conn = null
    try {
        conn = await pool.promise().getConnection();
        const [rows, fields] = await conn.query(query, parameters)
        return { status:true, data: rows}
    } catch (error) {
        console.log("Mysql Error ", error)
        return { status:false, data: error}
    }finally{
        if(conn){
            conn.release()
        }
    }
}


module.exports = {
    queryProcedure,
    querySql
}