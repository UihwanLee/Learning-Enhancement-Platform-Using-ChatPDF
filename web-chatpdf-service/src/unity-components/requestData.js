import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function useRequestDataEventListener(addEventListener, removeEventListener, sendMessage, currentInterViewRoomData, setCurrentInterViewRoomData, interviewType) {
  // Server 데이터 받기
  const [studyRooms, setStudyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const nickname = "Uihwan";

  const getStudyRoomData = async (nickname) =>{

    axios.get(`http://localhost:3001/room/studyRooms/${nickname}`)
      .then(response => {
        //setStudyRooms(response.data);
        for (const key in response.data){
          const roomData = JSON.stringify(response.data[key]);
          sendMessage("Server", "LoadStudyRoomData", roomData);
        }
        setLoading(false); // 데이터 로딩 완료
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태 해제
      });
  }

  const getInterviewRoomData = async (nickname) =>{
    axios.get(`http://localhost:3001/room/interviewRooms/${nickname}`)
      .then(response => {
        //setStudyRooms(response.data);
        console.log(typeof(response.data));
        for (const key in response.data){
          const roomData = JSON.stringify(response.data[key]);
          sendMessage("Server", "LoadInterviewRoomData", roomData);
        }
        setLoading(false); // 데이터 로딩 완료
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태 해제
      });
  }

  const getEvaluateRoomData = async (nickname) =>{
    axios.get(`http://localhost:3001/room/evaluateRooms/${nickname}`)
      .then(response => {
        //setStudyRooms(response.data);
        console.log(typeof(response.data));
        for (const key in response.data){
          const roomData = JSON.stringify(response.data[key]);
          sendMessage("Server", "LoadEvaluateRoomData", roomData);
        }
        setLoading(false); // 데이터 로딩 완료
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태 해제
      });
  }

  const RequestData = useCallback(() =>{
    // USER 데이터 보내기
    sendMessage("Server", "SetUserNickName", nickname);
    sendMessage("Server", "LoadUserData", nickname);
    // ROOM DATA 보내기
    getStudyRoomData(nickname);
    getInterviewRoomData(nickname);
  });

  useEffect(() => {
    addEventListener("RequestData", RequestData);
    return () => {
      removeEventListener("RequestData", RequestData);
    };
  }, [addEventListener, removeEventListener, RequestData]);

  const fetchImages = async (folderPath) => {
    try {
      const response = await axios.get(`http://localhost:3001/files/images?folder=${folderPath}`);
      console.log(response.data);
      setImages(response.data);
      setLoading(false);
     
      for (const key in response.data){
        console.log(response.data[key]);
        sendMessage("PDFViewer", "GetTextureFromURL", response.data[key]);
      }
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  // StudyRoomRequest 처리
  const RequestStudyRoomData = useCallback((roomData) =>{
    // nickname 값에 맞는 Data 보내기
    console.log("studyRoomData: " + roomData);
    const JSONroomData = JSON.parse(roomData);
    const JSONroomDataFilePDF = JSONroomData.titlePDF;
    const file = JSONroomDataFilePDF.substring(0, JSONroomDataFilePDF.lastIndexOf('.'));

    const folderPath = file; // 여기에 원하는 폴더 경로를 설정하세요

    fetchImages(folderPath);

    console.log("images: ", images);
  });

  useEffect(() => {
    addEventListener("RequestStudyRoomData", RequestStudyRoomData);
    return () => {
      removeEventListener("RequestStudyRoomData", RequestStudyRoomData);
    };
  }, [addEventListener, removeEventListener, RequestStudyRoomData]);

  // 1. JSONroomDataDocument를 서버에 보내주기
  // 2. 서버에서 JSONroomDataDocument 파일명을 가진 AWS S3에서 파일 가져오기
  // 3. 가져온 파일로 ChatPDF API 호출
  // InterviewRoomRequest 처리
  const RequestInterviewRoomData = useCallback((roomData) => {
    setCurrentInterViewRoomData(roomData);
    sendMessage("Server", "ClearLogData");
    
    // roomData를 파싱하여 필요한 값을 추출합니다
    const JSONroomData = JSON.parse(roomData);
    const JSONroomDataDocument = JSONroomData.document; // 면접방에서 쓰일 PDF 파일명

    const JSONinterviewType = JSONroomData.interviewType;
    
    interviewType = JSONinterviewType;
    console.log("현재 인터뷰타입:", interviewType);

    console.log("interviewRoomData: ", roomData);
    console.log("JSONroomDataDocument:", JSONroomDataDocument);
    console.log("JSONroomDataDocument Type:", typeof(JSONroomDataDocument));

    // document 데이터를 서버로 보내는 함수
    const sendDocumentData = (document) => {
      const data = {
        document: document
      };

      axios.post('http://localhost:3001/files/SendDocumentData', data)
        .then(response => {
          console.log('DocumentData sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
    };

    // JSONroomDataDocument를 서버로 보냅니다
    sendDocumentData(JSONroomDataDocument);
    
    //sendMessage("Server", "ClearLogData");
  });
  //const file = JSONroomDataFilePDF.substring(0, JSONroomDataFilePDF.lastIndexOf('.'));
  useEffect(() => {
    addEventListener("RequestInterviewRoomData", RequestInterviewRoomData);
    return () => {
      removeEventListener("RequestInterviewRoomData", RequestInterviewRoomData);
    };
  }, [addEventListener, removeEventListener, RequestInterviewRoomData]);

  // EvaluateRoomRequest 처리
  const RequestEvaluateRoomData = useCallback(async (roomData) =>{
    console.log("RequestEvaluateRoomData 호출됨.");
    // roomData를 파싱하여 필요한 값을 추출합니다
    const JSONroomData = JSON.parse(roomData);
    const JSONroomDataDocument = JSONroomData.document; // 평가방에서 쓰일 파일명
    sendMessage("Server", "ClearLogData");

    // //preQNA 데이터 가져오기
    // const preQNAData = await axios.get("http://localhost:3001/prompt/getPreQNA",
    //   {params: {filename: JSONroomDataDocument}}
    // );

    // console.log("preQNAData: ", preQNAData);
    
    // for (let i = 0; i < 5; i++) {
    //   // [사전 조사] 평가방 5번 반복
    //   console.log("Test!!:,", preQNAData.evaluation[i][1]);
    //   sendMessage("PromptManager", "AddQuestionLog", preQNAData.questions[i]);
    //   sendMessage("PromptManager", "AddAnswerLogData", preQNAData.answers[i]);
    //   sendMessage("PromptManager", "AddModelAnswerLogData", preQNAData.evaluation[i][1]);
    //   sendMessage("PromptManager", "AddComprehensiveEvaluationLogData", preQNAData.evaluation[i][2]);
    // }
    
  });

  // 평가방을 들어갔을 때 호출
  useEffect(() => {
    addEventListener("RequestEvaluateRoomData", RequestEvaluateRoomData);
    return () => {
      removeEventListener("RequestEvaluateRoomData", RequestEvaluateRoomData);
    };
  }, [addEventListener, removeEventListener, RequestEvaluateRoomData]);

  const sendPreEval = async () => {
    await axios.post('http://localhost:3001/prompt/preEval')
      .then(response => {
        console.log('POST /preEval Success:', response);
      })
      .catch(error => {
        console.error('POST /preEval Error sending:', error);
      });
  };

  const sendEvaluateRoomData = async (currentInterViewRoomData) => {
    console.log("currentInterViewRoomData: ", currentInterViewRoomData);
    await axios.post('http://localhost:3001/room/evaluateRoomData', { currentInterViewRoomData: currentInterViewRoomData })
      .then(response => {
        console.log('POST /room/evaluateRoomData Success:', response);
      })
      .catch(error => {
        console.error('POST /room/evaluateRoomData Error:', error);
      });
  };   

  const RequestEndInterviewData = useCallback((roomData) =>{
    console.log("돌아가기 누름");

    sendEvaluateRoomData(currentInterViewRoomData);
  
    const JSONroomData = JSON.parse(roomData);
    const JSONroomDataInterviewType = JSONroomData.interviewType;

    // 사전조사인 경우
    if (JSONroomDataInterviewType === 0){
      console.log("사전조사인 경우");
      // 사전 조사인 경우 평가
      sendPreEval();

      //sendMessage("Server", "SetScoreList", "30/30/70/30/30");
    } else {

    }

    

  });
  
  useEffect(() => {
    addEventListener("RequestEndInterviewData", RequestEndInterviewData);
    return () => {
      removeEventListener("RequestEndInterviewData", RequestEndInterviewData);
    };
  }, [addEventListener, removeEventListener, RequestEndInterviewData]);
  
  // 평가 버튼 눌렀을 때 실행
  const RequestEvaluate = useCallback(async (roomData) =>{
    console.log("RequestEvaluate 호출됨");

    const JSONroomData = JSON.parse(roomData);
    const JSONroomDataDocument = JSONroomData.document;
    let scoreList = "";
    
    //preQNA 데이터 가져오기
    const preQNAData = await axios.get("http://localhost:3001/prompt/getPreQNA",
      {params: {filename: JSONroomDataDocument}}
    );

    // console.log("preQNAData: ", preQNAData.data.questions[0]); // 질문 5개 배열
    // console.log("preQNAData: ", preQNAData.data.answers[0]); // 답변 5개 배열
    // console.log("preQNAData: ", preQNAData.data.evaluation[0][0]); // 첫번째 질문의 점수
    // console.log("preQNAData: ", typeof(preQNAData.data.evaluation[0][0])); // 첫번째 질문의 점수
    // console.log("preQNAData: ", preQNAData.data.evaluation[0][1]); // 첫번째 질문의 모범답변
    // console.log("preQNAData: ", preQNAData.data.evaluation[0][2]); // 첫번째 질문의 종합의견
    for(let i = 0; i < 5; i++){
      scoreList = scoreList + preQNAData.data.evaluation[i][0] + '/'
    }

    for(let j = 0; j < 5; j++){
      scoreList = scoreList + preQNAData.data.indexes[j] + '/'
    }

    scoreList = scoreList.slice(0, -1);
    console.log("scoreList: ", scoreList);
    //sendMessage("InterviewRoomManager", "CreatePrevInterviewRoom", scoreList);
  });

  useEffect(() => {
    addEventListener("RequestEvaluate", RequestEvaluate);
    return () => {
      removeEventListener("RequestEvaluate", RequestEvaluate);
    };
  }, [addEventListener, removeEventListener, RequestEvaluate]);
}