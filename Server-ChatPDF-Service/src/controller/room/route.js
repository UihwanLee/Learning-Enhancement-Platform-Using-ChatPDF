const express = require('express');
const router = express.Router();
const service = require('./service');

const connectDB = require('../../utils/connectDB');

router.get('/', async (req, res) => {
  try {
    const data = await service.getData();
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/RoomData', async (req, res) => {
  try {
    console.log("POST /RoomData");
    const jsonRoomData = req.body;
    roomData = JSON.parse(jsonRoomData.roomData);
    console.log(roomData);

    const db = await connectDB();
    await db.collection('room').insertOne( 
      { nickname: "Uihwan", id: roomData.id, title: roomData.title, category: roomData.category, index: roomData.index, 
        interviewerCount: roomData.interviewerCount, interviewerGender: roomData.interviewerGender, 
        interviewTime: roomData.interviewTime, interviewStyle: roomData.interviewStyle});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  

module.exports = router;