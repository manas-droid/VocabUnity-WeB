import express from 'express';
import {addUser , fetchUser, updateUser} from '../controllers/User';

const router = express.Router();


router.post('/api/users/fetch-users' , fetchUser);
router.post('/api/users/add' , addUser);
router.post('/api/users/update-user' , updateUser);

export default router;