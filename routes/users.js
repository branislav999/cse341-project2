const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');
const { userValidationRules, validate } = require('../validation/validator')


/**
 * @swagger
 * /users/
 *   get:
 *     summary: Retrieve users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users/', controllers.getUser);


/**
 * @swagger
 * /users/:id
 *   get:
 *     summary: Retrieve a user by id
 *     responses:
 *       200:
 *         description: A user
 */
router.get('/users/:id', controllers.getUserById);


/**
 * @swagger
 * /users/
 *   post:
 *     summary: Add a user
 *     responses:
 *       201:
 *         description: Insert a user
 */
router.post('/users/', userValidationRules(), validate, controllers.postUser);


/**
 * @swagger
 * /users/
 *   put:
 *     summary: Modify a user
 *     responses:
 *       201:
 *         description: Modify a user by id
 */
router.put('/users/:id', controllers.putUser);


/**
 * @swagger
 * /users/
 *   delete:
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: Delete a user by id
 */
router.delete('/users/:id', controllers.deleteUser);


module.exports = router;