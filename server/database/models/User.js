import db from "../databaseInstance";

class User {

    static addUser(id,username,photoURL){
        const QUERY = `
        INSERT INTO User (id,username,photoURL) VALUES (?,?,?);
        `;
        return db.query(QUERY , [id,username,photoURL]);
    }
}

export default User;