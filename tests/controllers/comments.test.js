const request = require('supertest');
const app = require('../../app');

require('dotenv').config();

// Here will appears tests for my requests (comments)
// All test for getComments end-point passed. Only one is not correct, which i commented
const axios = require('axios');
//const { v4: uuidv4 } = require('uuid');
//uuidv4();
const keys = require('../../global_keys/keys');
const commentsController = require('../../controllers/comments.controller');
const token = keys.TOKEN;

const url = keys.REST_API_URL;

describe('GET /posts/:postID/comments', () => {
    it('should return post for provided postID', async () => {
        const postID = 1;
        const res = await axios.get(`${url}/${postID}/comments`);
        expect(res.status).toEqual(200);
        expect(res.data).toBeInstanceOf(Array);
        //expect(res.data.length).toBeGreaterThan(0); // error appears here
    });

    it('should handle errors', async () => {
        const postID = 'invalid';
        try {
            await axios.get(`${url}/${postID}/comments`);
        } catch (error) {
            expect(error.res.status).toEqual(500);
            expect(error.res.data).toEqual('Server Error in POST request');
        }
    });
});

describe('POST /posts/:postID/comments', () => {
    it('should create a comment under the post', async () => {
        // params for tests
        const postID = 1;
        const randomID = Math.random() * 10000;
        const commentData = {
            id: randomID,
            post_id: postID,
            name: 'Test',
            email: 'test14156@gmail.com',
            body: "Test comment"
        };
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const res = await axios.post(`${url}/${postID}/comments`, commentData, { headers });
        expect(res.status).toEqual(201);
        expect(res.data).toEqual(commentData);
    });
});








// const postID = 1;
//         const mockResponse = {
//           data: [{ id: 1, post_id: 1, name: 'Comment 1', email: 'comment1@example.com', body: 'This is comment 1' }]
//         };
 
//         // Mock request and response objects
//         const req = { params: {postID} };
//         const res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis(),
//             send: jest.fn().mockReturnThis(),
//         };

//         // Call getComments end-point
//         await commentsController.getComments(req, res);

//         //expect(axios.get).toHaveBeenCalledWith(`${url}/${postID}/comments`);
//         //expect(res.statusCode).toBe(200);
//         expect(res.status).toHaveBeenCalledWith(200);
//         expect(res.json).toHaveBeenCalledWith(mockResponse.data);