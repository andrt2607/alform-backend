const { registerUser, loginUser, refreshToken } = require("../handler/user_handler");

var router = require("express").Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                  type: string
 *               status:
 *                 type: string
 *     description: Membuat akun user baru
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/register', registerUser)
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     description: Login user
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/login', loginUser)
/**
 * @swagger
 * /user/refreshToken:
 *   post:
 *     summary: refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     description: untuk generate access token dan refresh token
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/refreshToken', refreshToken)

module.exports = router