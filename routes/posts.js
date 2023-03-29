const express = require('express');
const { getPosts } = require('../controllers/posts.controller');

const router = express.Router();

/* Getting or creating posts */
router.get('/posts', getPosts);

//router.post('/users/:postID/posts', createUserPost);

module.exports = router;