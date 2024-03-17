require('dotenv').config();

const { MongoClient } = require('mongodb');
let db;
const url = process.env.MONGODB_KEY;

async function connectDB(){
    try{
        const client = new MongoClient(url);
        await client.connect();
        console.log('Connected to MongoDB');
        // ChatPDF_test DB와 연결한 db 리턴
        return client.db('ChatPDF_education');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
  }

module.exports = connectDB;