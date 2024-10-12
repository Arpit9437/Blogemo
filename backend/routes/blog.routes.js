import express from "express";
import multer from "multer";
import { loginUser, logoutUser, registerUser,checkAuth, createPost, getPost, getSinglePost, editPost, deletePost } from "../controller.js/blog.controller.js";
import {verifyToken} from '../utils/verifyToken.js'

const router = express.Router();
const uploadMiddleware = multer({dest: './uploads/'})

router.get("/check-auth", verifyToken, checkAuth);

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser)
router.post('/post', uploadMiddleware.single('file'), createPost);

router.put('/post/:id',uploadMiddleware.single('file'), editPost);

router.get('/post', getPost);
router.get('/post/:id', getSinglePost)

router.delete('/post/:id', verifyToken, deletePost);

export default router;