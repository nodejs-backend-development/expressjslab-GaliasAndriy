// I use axios because it allows me to do an easy asynchronous HTTP request to REST API.
const axios = require('axios');
const keys = require('../global_keys/keys');
const { createCommentRequest } = require('../clients/httpClient');

const url = keys.REST_API_URL;

const getComments = async (req, res) => {
    try {
        const { postID } = req.params;
        const response = await axios.get(`${url}/${postID}/comments`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
// here data it's our payload returned from the server

const createComment = async (req, res) => {
    try {
        const { postID } = req.params;
        const { id, post_id, name, email, body } = req.body;

        if (parseInt(postID) !== post_id) {
            res.status(400).send('postID parameter and post_id field must be the same value');
            return;
        }

        const commentData = await createCommentRequest(
            `${url}/${postID}/comments`,
            JSON.stringify({ id, post_id, name, email, body }),
        );

        res.status(201).json(commentData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error in POST request');
    }
};

module.exports = {
    getComments,
    createComment,
};
