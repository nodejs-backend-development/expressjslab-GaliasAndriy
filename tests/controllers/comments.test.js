const axios = require('axios');
const request = require('supertest');
const app = require('../../app');
const keys = require('../../global_keys/keys');
const { createCommentRequest } = require('../../clients/httpClient');
require('dotenv').config();

jest.mock('axios');

const url = keys.REST_API_URL;

describe('GET /posts/:postID/comments', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return all comments under post', async () => {
        const mockData = [
            { 
                id: 333, 
                post_id: 1, 
                name: "Test name", 
                email: "testtest@outlook.com", 
                body: "unit test" 
            }
        ];
        axios.get.mockResolvedValue({ data: mockData });

        const res = await request(app).get('/posts/1/comments');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(`${url}/1/comments`);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it('should return error on server error', async () => {
        axios.get.mockRejectedValue(new Error('Server Error'));

        const res = await request(app).get('/posts/1/comments');
        expect(res.statusCode).toEqual(500);
        expect(res.text).toEqual('Server Error');
        expect(axios.get).toHaveBeenCalledWith(`${url}/1/comments`);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});

jest.mock('../../clients/httpClient');
const token = keys.TOKEN;

describe('POST /posts/:postID/comments', () => {
    it('should create a comment', async () => {
        const mockData = {
            id: 1,
            post_id: 1,
            name: "Mr. Test",
            email: "testtest1234@gmail.com",
            body: "unit test for post"
        };
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        createCommentRequest.mockResolvedValueOnce({ data: mockData });

        const res = await request(app).post('/posts/1/comments').send(mockData);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({data: mockData});
        expect(createCommentRequest).toHaveBeenCalledTimes(1);
        expect(createCommentRequest).toHaveBeenCalledWith(`${url}/1/comments`, JSON.stringify(mockData));
    });

    it('should return error if postID and post_id are not equal', async () => {
        const mockData = { id: 1, post_id: 2, name: "Test name", email: "testtest@outlook.com", body: "unit test" };
        const errorMessage = 'postID parameter and post_id field must be the same value';
        createCommentRequest.mockRejectedValue({ message: errorMessage });
      
        const res = await request(app).post('/posts/1/comments').send(mockData);
        expect(res.statusCode).toEqual(400);
        expect(jest.fn()).not.toHaveBeenCalled();
    });

    it('should return error on server error', async () => {
        const mockData = { id: 1, post_id: 1, name: "Test name", email: "testtest@outlook.com", body: "unit test" };
        createCommentRequest.mockRejectedValue(new Error('Server Error'));

        const res = await request(app).post('/posts/1/comments').send(mockData);
        expect(res.statusCode).toEqual(500);
        expect(res.text).toEqual('Server Error in POST request');
    });
});
