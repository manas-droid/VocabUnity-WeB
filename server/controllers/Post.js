import PostModel from "../database/models/Post";

const addPost = async (req,res)=>{
    console.log(req.body);

    const {userid , word ,example , language} = req.body; 
    if(!userid) return res.status(403).json({"post" :  "user not logged in" , "ok":false});

    try {
        const response = await PostModel.addPost(userid,word,language,example);
        console.log("Response add post" , response);
        return res.status(200).json({"post":"successfully added" , "ok":true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"post":"failed to add" , "ok":false});
    }
}



export default addPost;