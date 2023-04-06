const express = require('express');
const { getComments, createComment } = require('../controllers/comments.controller');

const router = express.Router();

router.get('/posts/:postID/comments', getComments); // Retrieves post comments GET /public/v2/posts/1210/comments

router.post('/posts/:postID/comments', createComment); // Creates a post comment POST /public/v2/posts/1210/comments

module.exports = router;
