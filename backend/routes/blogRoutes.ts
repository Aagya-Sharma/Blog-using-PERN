import { Router, Request, Response } from "express";
import { BlogController } from "../controllers/blogController";

import authMiddleware from '../middleware/authMiddleware'


const blogrouter = Router();

blogrouter.post('/create',authMiddleware,BlogController.addBlog)
blogrouter.post('/get',authMiddleware,BlogController.getBlogs)
blogrouter.post('/get/:BlogId',authMiddleware,BlogController.getBlog)




export { blogrouter };