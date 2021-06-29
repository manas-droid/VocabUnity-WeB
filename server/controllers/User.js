import UserModel from '../database/models/User';

const addUser = async (req,res)=>{
    console.log(req.body);
    const {displayName , photoURL, uid} = req.body;

    if(!uid) return res.status(403).json({"user" : "id not defined" , "ok":false});
    try {   
        const response = await UserModel.addUser(uid,displayName || Math.random().toString(36).substring(8), photoURL || 'http://lorempixel.com/400/200/');
        console.log(response[0]);
        return res.status(200).json({"user" : "successfully added user" , "ok" : true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({"user":"failed to add user" , "ok":false});
    }
}


const fetchUser = (req,res)=>{
    return res.status(200).json({"user" : "successfully added user" , "ok" : true});
}

export {
    addUser,
    fetchUser
};