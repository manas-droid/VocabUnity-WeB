import mysql from 'mysql2';
const connection = mysql.createPool({
    connectionLimit:5,
    host : 'bwwyqlplclf2a7bi3pzv-mysql.services.clever-cloud.com',
    user : 'utldmkj3nlafbvfm',
    password : 'PtI8GGcfT8Fp3aNk2vFW',
    port : 3306,
    database : 'bwwyqlplclf2a7bi3pzv',
});

export default connection.promise();