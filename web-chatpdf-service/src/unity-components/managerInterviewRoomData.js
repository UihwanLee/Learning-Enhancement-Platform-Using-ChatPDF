import { useCallback, useEffect } from "react";
import axios from "axios";

export function useManagerInterviewRoomDataEventListener(addEventListener, removeEventListener) {

  // roomdata 서버로 send
  const sendRoomdataToServer = async (roomData) => {
    try {
      const response = await axios.post('http://localhost:3001/room/interviewRoomData', {
        roomData: roomData
      });
      
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  // Room Data 저장
  // 방 생성 누르면 호출
  const SaveRoomData = useCallback((roomData) =>{
    // RoomDataList에 roomData JSON 정보 저장
    console.log(roomData);
    sendRoomdataToServer(roomData);
  });

  useEffect(() => {
    addEventListener("SendRoomData", SaveRoomData);
    return () => {
      removeEventListener("SendRoomData", SaveRoomData);
    };
  }, [addEventListener, removeEventListener, SaveRoomData]);

////////////////////////////////////////////////////////////////////////////////

  // Interview Room Data 삭제
  const DeleteRoomData = useCallback((roomID) =>{
    // RoomDataList에 roomData JSON 정보 삭제
    console.log(roomID);
    
  });

  useEffect(() => {
    addEventListener("DeleteInterviewRoomData", DeleteRoomData);
    return () => {
      removeEventListener("DeleteInterviewRoomData", DeleteRoomData);
    };
  }, [addEventListener, removeEventListener, SaveRoomData]);

  // Evaluate roomdata 서버로 send
  const sendEvaluateRoomdataToServer = async (roomData) => {
    try {
      const response = await axios.post('http://localhost:3001/room/evaluateRoomData', {
        roomData: roomData
      });
      
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  // Room Data 저장
  // 방 생성 누르면 호출
  const SaveEvaluateRoom = useCallback((roomData) =>{
    // RoomDataList에 roomData JSON 정보 저장
    console.log(roomData);
    sendRoomdataToServer(roomData);
  });

  useEffect(() => {
    addEventListener("SendEvaluateRoomData", SaveEvaluateRoom);
    return () => {
      removeEventListener("SendEvaluateRoomData", SaveEvaluateRoom);
    };
  }, [addEventListener, removeEventListener, SaveEvaluateRoom]);
}

