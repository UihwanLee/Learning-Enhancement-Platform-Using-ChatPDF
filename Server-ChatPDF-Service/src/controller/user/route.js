const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const connectDB = require('../../utils/connectDB');

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const db = await connectDB();
    const users = await db.collection("user");

    const { userId, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const existingUser = await users.findOne({ userId });
    if (existingUser) {
      return res.status(409).send('User ID already exists');
    }

    await users.insertOne({ userId, username, password: hashedPassword });
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    console.log("POST /login 호출됨");
    const db = await connectDB();
    const users = await db.collection("user");

    const { userId, password } = req.body;
    const user = await users.findOne({ userId });
    if (!user) return res.status(404).send('아이디가 없습니다.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('비밀번호가 틀렸습니다.');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


