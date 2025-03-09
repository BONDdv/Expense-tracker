const express = require("express");
const {protect} = require("../middleware/authMiddleware")

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     description: This endpoint registers a new user with fullName, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (Invalid data)
 *       500:
 *         description: Server error
 */
router.post("/register", registerUser);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [User]
 *     description: This endpoint logs in a user by email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", loginUser);


/**
 * @swagger
 * /api/auth/getUser:
 *   get:
 *     summary: Get user information
 *     tags: [User]
 *     description: This endpoint retrieves the user information based on the provided JWT token.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Not authorized (Invalid or no token)
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/getUser", protect,getUserInfo);

module.exports = router;