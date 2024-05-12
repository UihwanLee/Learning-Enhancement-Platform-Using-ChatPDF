import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function useRequestDataEventListener(addEventListener, removeEventListener, sendMessage) {
  // Server 데이터 받기
  const [studyRooms, setStudyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const nickname = "Uihwan";

  const getStudyRoomData = async (nickname) =>{

    axios.get(`http://localhost:3001/room/interviewRooms/${nickname}`)
      .then(response => {
        setStudyRooms(response.data);
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
      //console.log(typeof(response.data));
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
    // id 값에 맞는 Data 보내기
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

  // InterviewRoomRequest 처리
  const RequestInterviewRoomData = useCallback(() =>{
    // id 값에 맞는 Data 보내기

  });

  useEffect(() => {
    addEventListener("RequestInterviewRoomData", RequestInterviewRoomData);
    return () => {
      removeEventListener("RequestInterviewRoomData", RequestInterviewRoomData);
    };
  }, [addEventListener, removeEventListener, RequestInterviewRoomData]);

  // EvaluateRoomRequest 처리
  const RequestEvaluateRoomData = useCallback(() =>{
    // id 값에 맞는 Data 보내기

  });

  useEffect(() => {
    addEventListener("RequestEvaluateRoomData", RequestEvaluateRoomData);
    return () => {
      removeEventListener("RequestEvaluateRoomData", RequestEvaluateRoomData);
    };
  }, [addEventListener, removeEventListener, RequestEvaluateRoomData]);
}