import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  getUserGallery,
  loginUser,
  registerUser,
  uploadHandle,
} from "../controllers/uploadHandle.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

let router = Router();
router
  .route("/gallery/upload")
  .post(verifyJWT, upload.single("image"), uploadHandle);
router.route("/register").post(registerUser);
router.route("/gallery").get(verifyJWT, getUserGallery);
router.route("/login").post(loginUser);
export default router;
