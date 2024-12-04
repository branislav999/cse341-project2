const express = require('express');
const lessonsRouter = express.Router();
const lessonsControllers = require('../controllers/lessons');
const { ensureAuthenticated } = require('./users');

// lessonsRouter.use(ensureAuthenticated);

/**
 * @swagger
 * /lessons/:
 *   get:
 *     summary: Retrieve all lessons
 *     responses:
 *       200:
 *         description: A list of lessons
 */
lessonsRouter.get('/lessons/', lessonsControllers.getLesson);

/**
 * @swagger
 * /lessons/:id:
 *   get:
 *     summary: Retrieve a lesson by ID
 *     responses:
 *       200:
 *         description: A lesson
 */
lessonsRouter.get('/lessons/:id', lessonsControllers.getLessonById);

/**
 * @swagger
 * /lessons/:
 *   post:
 *     summary: Add a new lesson
 *     responses:
 *       201:
 *         description: A new lesson was added
 */
lessonsRouter.post('/lessons/', lessonsControllers.postLesson);

/**
 * @swagger
 * /lessons/:id:
 *   put:
 *     summary: Modify a lesson
 *     responses:
 *       201:
 *         description: The lesson was updated
 */
lessonsRouter.put('/lessons/:id', lessonsControllers.putLesson);

/**
 * @swagger
 * /lessons/:id:
 *   delete:
 *     summary: Delete a lesson
 *     responses:
 *       200:
 *         description: The lesson was deleted
 */
lessonsRouter.delete('/lessons/:id', lessonsControllers.deleteLesson);

module.exports = { lessonsRouter };
