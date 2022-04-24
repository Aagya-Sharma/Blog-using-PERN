import { Router, Request, Response } from "express";
import { Categorycontroller } from "../controllers/categoryController";

import verifyadmin from '../middleware/verifyadmin'

const categoryrouter = Router();



categoryrouter.post("/create",verifyadmin, Categorycontroller.addCategory);


export { categoryrouter };