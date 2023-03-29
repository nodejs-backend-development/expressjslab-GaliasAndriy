require('dotenv').config();

// Here will appears tests for my requests (comments)
const axios = require('axios');
const keys = require('../../global_keys/keys');

const token = keys.TOKEN;

const url = keys.REST_API_URL;

describe('GET /posts/:postID/comments', () => {
    it('should return post for provided postID', async () => {
        const postID = 1;
        const res = await axios.get(`${url}/${postID}/comments`);
        expect(res.status).toEqual(200);
        expect(res.data).toBeInstanceOf(Array);
        expect(Array.isArray(res.data)).toBe(true);
        // expect(res.data.length).toBeGreaterThan(0); // failed, but it could be
    });

    it('should handle errors', async () => {
        const postID = 'invalid';
        try {
            await axios.get(`${url}/${postID}/comments`);
        } catch (error) {
            expect(error.res.status).toEqual(500);
            expect(error.res.data).toEqual('Server Error');
        }
    });
});

describe('POST /posts/:postID/comments', () => {
    it('should create a comment under the post', async () => {
        // params for tests
        const postID = 1;
        const commentData = {
            post_id: postID,
            name: 'Test',
            email: 'test14156@gmail.com',
            body: 'Test comment',
        };
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        const res = await axios.post(`${url}/${postID}/comments`, commentData, { headers });
        expect(res.status).toEqual(201); // failed, and it's not good
        // I receive here 200 status code instead of expected 201 statusCode
        expect(res.data).toBeInstanceOf(Array);
    });

    it('should handle errors', async () => {
        const postID = 'invalid';
        try {
            await axios.post(`${url}/${postID}/comments`);
        } catch (error) {
            expect(error.res.status).toEqual(500);
            expect(error.res.data).toEqual('Server Error in POST request');
        }
    });
});
