import { useCallback, useEffect } from "react";
import axios from "axios";

export function useManagerStudyRoomDataEventListener(addEventListener, removeEventListener) {

    // roomdata 서버로 send
    const sendRoomdataToServer = async (roomData) => {
      try {
        const response = await axios.post('http://localhost:3001/room/studyRoomData', {
          roomData: roomData
        });
        
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error sending answer:', error);
      }
    };

    // 목차 5개 생성 요청
    const sendPostIndexes = async () => {
      try {
        const indexes = await axios.post('http://localhost:3001/prompt/createIndex');
        
        console.log('Server response:', indexes.data);
      } catch (error) {
        console.error('Error sending answer:', error);
      }
    };
  
    // Room Data 저장
    // 방 생성 누르면 호출
    const SaveStudyRoomData = useCallback((roomData) =>{
      // RoomDataList에 roomData JSON 정보 저장
      console.log(roomData);
      sendRoomdataToServer(roomData);
      sendPostIndexes();
    });
  
    useEffect(() => {
      addEventListener("SendStudyRoomData", SaveStudyRoomData);
      return () => {
        removeEventListener("SendStudyRoomData", SaveStudyRoomData);
      };
    }, [addEventListener, removeEventListener, SaveStudyRoomData]);

    
  }