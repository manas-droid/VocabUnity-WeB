import UserModel from '../../database/models/User';

const updateUser = async (req,res)=>{
    const {id , username , photoURL} = req.body;
    try {
        const response = await UserModel.updateUser(id,username,photoURL);
        console.log(response);
        return res.status(200).json({"user":"successfully updated user" , "ok":true});
    } catch (error) {
        console.log(error);
        return res.status(503).json({"user":"failed to update user" , "ok":false});
    }

}

export {updateUser};