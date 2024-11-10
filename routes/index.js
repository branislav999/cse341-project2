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


router.get('/users/',async (req, res) => {
    try {
        const database = client.db('language');
        const collection = database.collection('users');
        const contacts = await collection.find().toArray();
        console.log(contacts);
        res.json(contacts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

router.post('/users/', async(req, res) => {
    const {userId, name, email, languagesLearning, completedLessons, points} = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).json({message: 'Missing the required field'});
    }

    try{
        const database = client.db('cse340');
        const collection = database.collection('contacts');

        const contact = {userId, name, email, languagesLearning, completedLessons, points};

        const insert = await collection.insertOne(contact);

        res.status(201).json({id: insert.insertedId});
    } catch (error) {
        res.status(500).json({message: error.message});
    }


});

module.exports = router;