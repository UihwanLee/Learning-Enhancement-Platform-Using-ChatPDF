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

router.post('/interviewRoomData', async (req, res) => {
  try {
    //console.log("test: ", req.body);
    console.log("POST /interviewRoomData");
    const jsoninterviewRoomData = req.body;
    roomData = JSON.parse(jsoninterviewRoomData.roomData);
    console.log(roomData);
   
    const db = await connectDB();
    await db.collection('interviewRoom').insertOne( 
      { id: roomData.id, nickname: roomData.nickname, title: roomData.title, category: roomData.category, document: roomData.document,
      index: roomData.index, isPrevInterview: roomData.isPrevInterview, interviewType: roomData.interviewType, interviewerCount: roomData.interviewerCount, 
      interviewerGender: roomData.interviewerGender, interviewTime: roomData.interviewTime, interviewStyle: roomData.interviewStyle});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/studyRoomData', async (req, res) => {
  try {
    console.log("POST /studyRoomData");
    const jsonstudyRoomData = req.body;
    roomData = JSON.parse(jsonstudyRoomData.roomData);
    console.log(roomData);

    const db = await connectDB();
    await db.collection('studyRoom').insertOne( 
      { id: roomData.id, nickname: roomData.nickname, title: roomData.title, titlePDF: roomData.titlePDF, category: roomData.category});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/evaluateRoomData', async (req, res) => {
  try {
    //console.log("test: ", req.body);
    console.log("POST /evaluateRoomData");
    const jsonEvaluateRoomData = req.body;
    roomData = JSON.parse(jsonEvaluateRoomData.roomData);
    console.log(roomData);
   
    const db = await connectDB();
    await db.collection('evaluateRoom').insertOne( 
      { id: roomData.id, nickname: roomData.nickname, title: roomData.title, category: roomData.category, document: roomData.document,
      index: roomData.index, isPrevInterview: roomData.isPrevInterview, interviewType: roomData.interviewType, interviewerCount: roomData.interviewerCount, 
      interviewerGender: roomData.interviewerGender, interviewTime: roomData.interviewTime, interviewStyle: roomData.interviewStyle});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 라우트: nickname을 이용해 인터뷰 룸 정보 조회
router.get('/interviewRooms/:nickname', async (req, res) => {
  const db = await connectDB();
  if (!db) return res.status(500).send('Failed to connect to the database');

  const collection = db.collection('interviewRoom');
  const nickname = req.params.nickname;

  try {
    // 쿼리와 projection 설정
    const query = { nickname: "Uihwan" };
    const projection = { _id: 0 };

    // 문서 찾기
    const documents = await collection.find(query).project(projection).toArray();
    if (!documents.length) {
      return res.status(404).send('No interview rooms found for the given nickname');
    }
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

// 라우트: nickname을 이용해 스터디 룸 정보 조회
router.get('/studyRooms/:nickname', async (req, res) => {
  const db = await connectDB();
  if (!db) return res.status(500).send('Failed to connect to the database');

  const collection = db.collection('studyRoom');
  const nickname = req.params.nickname;

  try {
    // 쿼리와 projection 설정
    const query = { nickname: "Uihwan" };
    const projection = { _id: 0 };

    // 문서 찾기
    const documents = await collection.find(query).project(projection).toArray();

    if (!documents.length) {
      return res.status(404).send('No study rooms found for the given nickname');
    }
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

// 라우트: nickname을 이용해 평가 룸 정보 조회
router.get('/evaluateRooms/:nickname', async (req, res) => {
  const db = await connectDB();
  if (!db) return res.status(500).send('Failed to connect to the database');

  const collection = db.collection('evaluateRoom');
  const nickname = req.params.nickname;

  try {
    // 쿼리와 projection 설정
    const query = { nickname: "Uihwan" };
    const projection = { _id: 0 };

    // 문서 찾기
    const documents = await collection.find(query).project(projection).toArray();
    if (!documents.length) {
      return res.status(404).send('No interview rooms found for the given nickname');
    }
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});
  

module.exports = router;