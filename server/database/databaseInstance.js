import mysql from 'mysql2';
import {config} from 'dotenv';
config();

const connection = mysql.createPool({
    connectionLimit:5,
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    port : 3306,
    database : process.env.DATABASE_NAME,
});

export default connection.promise();