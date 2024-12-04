const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const uri = process.env.MongoDBString;
const client = new MongoClient(uri);

async function connectDB() {
    try { 
        await client.connect();
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

connectDB();

const getLesson = async (req, res) => {
    try {
        const database = client.db('language');
        const collection = database.collection('lessons');
        const lesson = await collection.find().toArray();
        res.json(lesson);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const postLesson = async (req, res) => {
    const { lessonId, title, language, content, difficulty } = req.body;

    try { 
        const database = client.db('language');
        const collection = database.collection('lessons');

        const lesson = {
            lessonId,
            title,
            language,
            content,
            difficulty
        }

        const insert = await collection.insertOne(lesson);

        res.status(201).json({id: insert.insertedId, message: 'Succesfully added the lesson' });
    } catch (error) {
        res.status(501).json({ message: error.message });
    }

}

const getLessonById = async (req, res) => {
    const id = req.params.id;

    try {
        const database = client.db('language');
        const collection = database.collection('lessons');

        const lesson = await collection.findOne({_id: new ObjectId(id)});

        if (lesson) {
            res.json(lesson);
        } else {
            res.status(400).json({message: 'Lesson not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const putLesson = async (req, res) => {
    const id = req.params.id;
    const { lessonId, title, language, content, difficulty } = req.body;

    try {
        const database = client.db('language');
        const collection = database.collection('lessons');

        const lesson = await collection.updateOne(
            {_id: new ObjectId(id)},
            {$set: { lessonId, title, language, content, difficulty }}
        )

        if (lesson.modifiedCount === 0) {
            return res.status(400).json({message: 'Lesson not found or no changes made'});
        }
        
        res.status(200).json({message: 'Lesson updated succesfully'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

const deleteLesson = async (req, res) => {
    const id = req.params.id;

    try {
        const database = client.db('language');
        const collection = database.collection('lessons');

        const deleteUser = await collection.deleteOne({_id: new ObjectId(id)});

        if (deleteUser === 0){
            return res.status(400).json({message: "Lesson not found"});
        }
        
        res.status(200).json({ message: "Lesson deleted succesfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = { getLesson, postLesson, getLessonById, putLesson, deleteLesson }