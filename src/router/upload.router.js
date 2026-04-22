import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { loginUser, registerUser } from "../controllers/uploadHandle.controller.js";



let router = Router()
// router.route('/upload').post(upload.single("user"),uploadHandle)

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
export default router

