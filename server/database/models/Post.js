import db from "../databaseInstance";

class Post{
     static async addPost(userid , word , language , example){
        const sql = await db.getConnection();
        try{
            await sql.beginTransaction();
            
            const WORD_QUERY = `
            INSERT INTO Post (userid , word , language ) VALUES (? , ? , ?);
            `;

            const EXAMPLE_QUERY = `
            INSERT INTO Example (postid , example) VALUES (? , ?);
            `;

            const post_response = await sql.query(WORD_QUERY , [userid,word,language]);

            console.log("ADD POST , post: " , post_response);

            const postid = post_response[0].insertId;
            
            const exampleResponse = await sql.query(EXAMPLE_QUERY , [postid , example]);
            await sql.commit();

        }catch(error){
            console.log("add post ERROR" , error);
            await sql.rollback();
        }finally{
            return sql.release();
        }

    }   
}

export default Post;