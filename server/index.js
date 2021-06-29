import express from "express";
import cors from 'cors';
import userController from './routes/User';
import postController from './routes/Post';
const PORT = 5000;
const app = express();

app.use(cors());

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(userController);
app.use(postController);

app.listen(PORT , ()=>console.log(`connected to port:${PORT}`));