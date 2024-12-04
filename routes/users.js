const express = require('express');
const usersRouter = express.Router();
const usersControllers = require('../controllers/users');
const { userValidationRules, validate } = require('../validation/validator')

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); 
    }
    res.redirect('/'); 
  }
  
usersRouter.use(ensureAuthenticated);


/**
 * @swagger
 * /users/
 *   get:
 *     summary: Retrieve users
 *     responses:
 *       200:
 *         description: A list of users
 */
usersRouter.get('/users/', usersControllers.getUser);


/**
 * @swagger
 * /users/:id
 *   get:
 *     summary: Retrieve a user by id
 *     responses:
 *       200:
 *         description: A user
 */
usersRouter.get('/users/:id', usersControllers.getUserById);


/**
 * @swagger
 * /users/
 *   post:
 *     summary: Add a user
 *     responses:
 *       201:
 *         description: Insert a user
 */
usersRouter.post('/users/', userValidationRules(), validate, usersControllers.postUser);


/**
 * @swagger
 * /users/
 *   put:
 *     summary: Modify a user
 *     responses:
 *       201:
 *         description: Modify a user by id
 */
usersRouter.put('/users/:id', usersControllers.putUser);


/**
 * @swagger
 * /users/
 *   delete:
 *     summary: Delete a user
 *     responses:
 *       200:
 *         description: Delete a user by id
 */
usersRouter.delete('/users/:id', usersControllers.deleteUser);


module.exports = { usersRouter , ensureAuthenticated }