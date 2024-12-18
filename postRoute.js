const express = require('express');
const { auth } = require('../middlewares/auth');
const { uploadPost, getPosts, likePost, commentPost } = require('../controllers/Post');

const postRouter = express.Router();

postRouter.post("/uploadPost", auth, uploadPost);
postRouter.get("/getPosts", auth, getPosts);
postRouter.post("/post/like/:id", auth, likePost);
postRouter.post("/post/comment/:id", auth, commentPost);

module.exports = postRouter;