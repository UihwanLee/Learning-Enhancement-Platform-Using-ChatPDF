const express = require('express');
const router = express.Router();
const service = require('./service');
const path = require('path');
const roomService = require('./service');

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
    console.log("studyRoomData:", roomData);

    const db = await connectDB();
    await db.collection('studyRoom').insertOne( 
      { id: roomData.id, nickname: roomData.nickname, title: roomData.title, titlePDF: roomData.titlePDF, category: roomData.category});
    

    // fileInfo 컬렉션 추가
    const documentName = path.parse(roomData.titlePDF).name;
    const FileInfo = {
      filename: roomData.titlePDF,
      filepath: 'C:/Users/sktpg/OneDrive/Desktop/졸작 파일/' + roomData.titlePDF,
      s3downloadedFilepath: 'C:/Users/sktpg/OneDrive/문서/GitHub/Learning-Enhancement-Platform-Using-ChatPDF/Server-ChatPDF-Service/src/controller/files/S3files/' + documentName + '/' + roomData.titlePDF
    };
    console.log("FileInfo:", FileInfo);

    // filename을 기준으로 문서 찾기
    const query = { filename: roomData.titlePDF };

    // filename이 이미 존재하는지 확인
    const existingDocument = await db.collection('fileInfo').findOne(query);

    if (existingDocument) {
      console.log('파일이 이미 있음');
    } else {
      // 문서 삽입
      await db.collection('fileInfo').insertOne(FileInfo);
      console.log('FileInfo document inserted');
      
      // roomService의 목차 생성 함수 호출
      const indexes = await roomService.generateIndexes(roomData.titlePDF);

      // indexes 객체를 5개 요소로 제한
      const limitedIndexes = Object.fromEntries(Object.entries(indexes).slice(0, 5));

      console.log("indexes: ", indexes);

      // 업데이트할 필드와 데이터
      const update = {
        $set: {
          indexes: limitedIndexes
        }
      };

      // 문서 업데이트
      const result = await db.collection('fileInfo').updateOne(query, update);

      if (result.matchedCount > 0) {
        console.log('Indexes field added/updated successfully');
      } else {
        console.log('No document found with the given filename');
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/evaluateRoomData', async (req, res) => {
  try {
    //console.log("test: ", req.body);
    console.log("POST /evaluateRoomData");
    const jsonEvaluateRoomData = req.body;
    evalRoomData = JSON.parse(jsonEvaluateRoomData.currentInterViewRoomData);
    console.log("evalRoomData:", evalRoomData);
   
    const db = await connectDB();
    await db.collection('evaluateRoom').insertOne( 
      { id: evalRoomData.id, nickname: evalRoomData.nickname, title: evalRoomData.title, category: evalRoomData.category, document: evalRoomData.document,
      index: evalRoomData.index, isPrevInterview: evalRoomData.isPrevInterview, interviewType: evalRoomData.interviewType, interviewerCount: evalRoomData.interviewerCount, 
      interviewerGender: evalRoomData.interviewerGender, interviewTime: evalRoomData.interviewTime, interviewStyle: evalRoomData.interviewStyle});
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