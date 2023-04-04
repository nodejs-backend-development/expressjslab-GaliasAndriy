const axios = require('axios');
const keys = require('../global_keys/keys');

const createCommentRequest = async (url, body) => {
    try {
        const token = keys.TOKEN;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    createCommentRequest,
};
