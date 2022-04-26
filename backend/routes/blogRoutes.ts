import { Router, Request, Response } from "express";
import { BlogController } from "../controllers/blogController";

import authMiddleware from '../middleware/authMiddleware'


const blogrouter = Router();

blogrouter.post('/create',authMiddleware,BlogController.addBlog)
blogrouter.get('/get',authMiddleware,BlogController.getBlogs)//get all the blogs of a particular user
blogrouter.get('/get/:BlogId',authMiddleware,BlogController.getBlog)
blogrouter.put('/update/:BlogId',authMiddleware,BlogController.updateBlog)
blogrouter.get('/getAll',BlogController.getAllBlogs)//get all the blogs list







export { blogrouter };