require('dotenv').config()

const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_DATABASE = process.env.MYSQL_DATABASE
const MYSQL_CONNECTION_LIMIT = process.env.MYSQL_CONNECTION_LIMIT
const MYSQL_QUEUE_LIMIT = process.env.MYSQL_QUEUE_LIMIT

module.exports = {
    MYSQL_HOST,
    MYSQL_USER, 
    MYSQL_PASSWORD, 
    MYSQL_DATABASE, 
    MYSQL_CONNECTION_LIMIT,
    MYSQL_QUEUE_LIMIT
}