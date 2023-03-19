// I use axios because it allows me to do an easy asynchronous HTTP request to REST API.
const axios = require('axios');

const url = 'http://gorest.co.in/public/v2/posts';

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
        const token = 'db2731ec124ce0fa02b868043f6c679bdb933f0219e9eea6ce8bc95e9dfe1053';

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(
            `${url}/${postID}/comments`,
            {
                id,
                post_id,
                name,
                email,
                body,
            },
            { headers },
        );
        res.status(201).json(response.data.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error in POST request');
    }
};

module.exports = {
    getComments,
    createComment,
};
