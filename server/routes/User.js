import express from 'express';
import {addUser , fetchUser} from '../controllers/User';

const router = express.Router();


router.get('/api/users/fetch-users' , fetchUser);
router.post('/api/users/add' , addUser);


export default router;