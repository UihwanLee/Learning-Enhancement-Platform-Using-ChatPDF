import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export function useRequestDataEventListener(addEventListener, removeEventListener, sendMessage) {
  // Server 데이터 받기
  const [studyRooms, setStudyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // StudyRoomRequest 처리
  const RequestStudyRoomData = useCallback(() =>{
    // id 값에 맞는 Data 보내기

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