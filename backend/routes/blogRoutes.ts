import { Router, Request, Response } from "express";
import { BlogController } from "../controllers/blogController";

import authMiddleware from '../middleware/authMiddleware'


const blogrouter = Router();

blogrouter.post('/create',authMiddleware,BlogController.addBlog)


export { blogrouter };