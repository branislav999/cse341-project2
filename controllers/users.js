const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const uri = process.env.MongoDBString;
const client = new MongoClient(uri);

async function connectDB() {
    await client.connect();
}

connectDB().catch(console.error);


const getUser = async (req, res) => {
    try {
        const database = client.db('language');
        const collection = database.collection('users');
        const users = await collection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postUser = async (req, res) => {
    const { userId, name, email, languagesLearning, completedLessons, points } = req.body;

    if (!name || !email || !languagesLearning || completedLessons === undefined || points === undefined) {
        return res.status(400).json({ message: 'Missing the required field' });
    }

    try {
        const database = client.db('language');
        const collection = database.collection('users');

        const user = {
            userId,
            name,
            email,
            languagesLearning,
            completedLessons: Number(completedLessons),
            points: Number(points)
        };

        const insert = await collection.insertOne(user);

        res.status(201).json({ id: insert.insertedId, message: 'Succesfully added the contact' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const database = client.db('language');
        const collection = database.collection('users');

        const user = await collection.findOne({_id: new ObjectId(id)});

        if (user) {
            res.json(user);
        } else {
            res.status(400).json({message: 'user not found'})
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const putUser = async (req, res) => {
    const id = req.params.id;
    const { userId, name, email, languagesLearning, completedLessons, points } = req.body;

    if (!name || !email || !languagesLearning || completedLessons === undefined || points === undefined ) {
        return res.status(400).json({ message: 'Missing the required field' });
    }

    try {
        const database = client.db('language');
        const collection = database.collection('users');

        const user = await collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: { userId, name, email, languagesLearning, completedLessons, points }}
        )

        if (user.modifiedCount === 0 ){
            return res.status(400).json({message:'User not found or no changes made'});
        }

        res.status(200).json({message: 'User updates successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const deleteUser = async (req, res) => {

    const id = req.params.id;

    try {
        const database = client.db('language');
        const collection = database.collection('users');

        const deleteUser = await collection.deleteOne({_id: new ObjectId(id)});
    
        if (deleteUser === 0) { 
            return res.status(400).json({message: 'User not found'});
        }

        res.status(200).json({message: 'User deleted sucessfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

} 


module.exports = { getUser, postUser, getUserById, putUser, deleteUser}