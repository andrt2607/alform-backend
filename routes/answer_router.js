const { createAnswer } = require("../handler/answer_handler");
const { authenticateJWT } = require("../middlewares/auth_middleware");

var router = require("express").Router();

/**
 * @swagger
 * /answer/{idForm}:
 *   post:
 *     summary: create answer
 *     tags: [Answers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                       description: ID pertanyaan
 *                     value:
 *                       type: string
 *                       description: Jawaban untuk pertanyaan
 *     description: Membuat answer baru
 *     responses:
 *       200:
 *         description: Respon sukses
 */
router.post('/:id', authenticateJWT, createAnswer)

module.exports = router