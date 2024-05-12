import { useCallback, useEffect } from "react";

export function useRequestDataEventListener(addEventListener, removeEventListener) {
  // Server 데이터 받기
  const RequestData = useCallback(() =>{
    // USER 데이터 보내기
      
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