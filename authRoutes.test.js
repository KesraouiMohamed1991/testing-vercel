const request = require('supertest');
const app = require('./app');
const User = require('./models/user');
const bcrypt = require('bcrypt');

describe('Bar Routes and Articles and auth', () => {

    describe('GET /all', () => {
        it('should get all bars', async () => {
            const response = await request(app).get('/bars/all');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    describe('GET /blogs', () => {
        it('should get all articles', async () => {
            const response = await request(app).get('/bars/blogs');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);

        });

    });

    describe('GET /events', () => {
        it('should get all articles', async () => {
            const response = await request(app).get('/bars/events');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('POST /users/signin', () => {
        it('should authenticate a user', async () => {

            const data = { username: 'mohamed', password: 'mohamed' }
            const response = await request(app)
                .post('/bars/users/signin')
                .send(data)
                .expect(200)
            console.log(response.status, response.body);
            expect(response.body.result).toBe(true);

        });
    });

    describe('POST /users/signup', () => {
        it('should authenticate a user', async () => {
            const data = {
                username: 'mohamed',
                password: 'mohamed',
                mail: 'Kesroui@gmail.com',
                phoneNumber: '056853329'
            };

            const response = await request(app)
                .post('/bars/users/signup')
                .send(data)
                .expect(200);
            console.log(response.status, response.body);

            if (response.body.result) {
                expect(response.body.result).toBe(true);
            } else {
                expect(response.body.result).toBe(false);
                expect(response.body.error).toBe('User already exists');
            }
        });
    });

    describe('PUT /users/changePassword', () => {
        it('should change the user password successfully', async () => {
            const testUser = new User({
                username: 'moha',
                password: bcrypt.hashSync('oldpassword', 8),
            });
            await testUser.save();

            const response = await request(app)
                .put('/bars/users/changePassword')
                .send({
                    username: 'moha',
                    password: 'mohamed',
                    newPassword: 'momoh',
                });

            // Check the response
            console.log(response.body);
            expect(response.status).toBe(200);

            const updatedUser = await User.findOne({ username: 'testuser' });
            expect(bcrypt.compareSync('newpassword', updatedUser.password)).toBe(true);
        });
    });







});

