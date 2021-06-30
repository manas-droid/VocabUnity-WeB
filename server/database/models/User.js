import db from "../databaseInstance";

class User {

    static addUser(id,username,photoURL){
        const INSERT_QUERY = `
        INSERT INTO User (id,username,photoURL) VALUES (?,?,?);
        `;
        return db.query(INSERT_QUERY , [id,username,photoURL]);
    }

    static getUser(id){
        const QUERY = `
        SELECT username , photoURL FROM User WHERE id=?
        `;

        return db.query(QUERY , [id]);
    }

    static updateUser(id,username,photoURL){
        const UPDATE_QUERY = `
           UPDATE User
           SET username=? , photoURL=?
           WHERE id = ?
        `;

        return db.query(UPDATE_QUERY , [username , photoURL , id]);
    }

}

export default User;