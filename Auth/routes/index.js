import express from 'express';
import { loginUser, registerUser, getUsers } from '../userController/index.js';
import { userRegisterValidate, userLoginValidate } from '../utility/userValidation.js';
import ensureAuthenticated from '../utility/auth.js';

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The user's full name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               fullName: John Doe
 *               email: john.doe@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *                 error:
 *                   type: string
 *                   example: "fullName is required"
 */
routes.post('/register', userRegisterValidate, registerUser);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               email: john.doe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User logged in successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *                 error:
 *                   type: string
 *                   example: "email is required"
 */
routes.post('/login', userLoginValidate, loginUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: User ID
 *                     example: 60d21b4667d0d8992e610c85
 *                   fullName:
 *                     type: string
 *                     description: The user's full name
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *                     example: john.doe@example.com
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */
routes.get('/user', ensureAuthenticated, getUsers);

export default routes;
