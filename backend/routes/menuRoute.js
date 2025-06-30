import express from "express";
import {addMenu , listMenu, specificMenuRemove} from '../controllers/menuControler.js';
import multer from 'multer';

const menuRouter = express.Router();

const storage = multer.diskStorage({
    destination:"menuImages",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

menuRouter.post('/add', upload.single('menu_image'), addMenu);
menuRouter.get('/list', listMenu);
menuRouter.delete('/remove/:id', specificMenuRemove);


export default menuRouter ;