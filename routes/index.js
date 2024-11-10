const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MongoDBString;
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
}


connectDB().catch(console.error);

/**
 * @swagger
 * /users/
 *   get:
 *     summary: Retrieve users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users/',async (req, res) => {
    try {
        const database = client.db('language');
        const collection = database.collection('users');
        const users = await collection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});


/**
 * @swagger
 * /users/
 *   post:
 *     summary: Add a user
 *     responses:
 *       200:
 *         description: Insert a user
 */
router.post('/users/', async(req, res) => {
    const {userId, name, email, languagesLearning, completedLessons, points} = req.body;

    if (!name || !email || !languagesLearning || !completedLessons || !points) {
        return res.status(400).json({message: 'Missing the required field'});
    }

    try{
        const database = client.db('language');
        const collection = database.collection('users');

        const user = {userId, name, email, languagesLearning, completedLessons, points};

        const insert = await collection.insertOne(user);

        res.status(201).json({id: insert.insertedId});
    } catch (error) {
        res.status(500).json({message: error.message});
    }


});

module.exports = router;