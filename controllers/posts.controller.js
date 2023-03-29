const axios = require('axios');
const keys = require('../global_keys/keys');

const url = keys.REST_API_URL;

const getPosts = async (req, res) => {
   try {
    const response = await axios.get(`${url}`);
    res.status(200).json(response.data);
   } catch (error) {
    console.error(error);
    res.status(500).send('Server Error in getUserPosts');
   }
};

module.exports = {
    getPosts,
};