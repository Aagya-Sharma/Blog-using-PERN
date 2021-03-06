import { Router, Request, Response } from "express";
import { Categorycontroller } from "../controllers/categoryController";

import verifyadmin from '../middleware/verifyadmin'

const categoryrouter = Router();



categoryrouter.post("/create",verifyadmin, Categorycontroller.addCategory);
categoryrouter.get("/get/:id", Categorycontroller.getBlogsWithCategory);//to get the blogs of a particular category
categoryrouter.get("/getAllCategory", Categorycontroller.getAllCategory);




export { categoryrouter };