import UserModel from '../../database/models/User';


const fetchUser = async (req,res)=>{
    const {id} = req.body;
    try {
        const response = await UserModel.getUser(id);
        return res.status(200).json({"user": response[0][0] , "ok":true });
    } catch (error) {
        console.log(error);
        return res.status(503).json({"user" : "failed fetched user" , "ok" : false});
        
    }
}

export {fetchUser};