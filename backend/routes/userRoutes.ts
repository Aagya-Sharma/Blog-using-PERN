import { Router, Request, Response } from "express";
import { Authcontroller } from "../controllers/authController";

const router = Router();


router.post("/add", Authcontroller.createUser);
router.post("/login", Authcontroller.loginUser);
router.post("/forget-password", Authcontroller.forgetPassword);
// router.post("/resetPassword", Authcontroller.resetPassword);
router.post("/resetPassword/:token", Authcontroller.resetPassword)








export { router };