import express from "express"
import { signup, login, profile, updateProfile, getPosts, createPost, updatePost, deletePost, upvotePost, addComment, getComments, deleteComment } from "../controllers/All.js"
import { authenticateToken } from "../config/middlewares.js"

const router = express.Router()

router.get("/profile", authenticateToken, profile)
router.put("/profile", authenticateToken, updateProfile)

router.get('/posts', getPosts)
router.post('/posts', authenticateToken, createPost);
router.put('/posts/:id', authenticateToken, updatePost);
router.delete('/posts/:id', authenticateToken, deletePost);
router.post('/posts/:id/upvote', authenticateToken, upvotePost);
router.post('/posts/:id/comments', authenticateToken, addComment);
router.get('/posts/:id/comments', getComments);
router.delete('/posts/:postId/comments/:commentId', authenticateToken, deleteComment);



export default router