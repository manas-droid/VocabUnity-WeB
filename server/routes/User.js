import express from 'express';
import {fetchUser} from '../controllers/User/GET';
import {addUser} from '../controllers/User/POST';
import {updateUser} from '../controllers/User/PUT';



const router = express.Router();

router.post('/api/users/fetch-users' , fetchUser);
router.post('/api/users/add' , addUser);
router.post('/api/users/update-user' , updateUser);
router.get('/hello-world' , (req,res)=>{return res.status(200).json({"response":"Hello World" , "ok":false});});

export default router;