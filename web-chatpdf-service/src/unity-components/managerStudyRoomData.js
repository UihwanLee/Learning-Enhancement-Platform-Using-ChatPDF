import { useCallback, useEffect } from "react";

export function useManagerStudyRoomDataEventListener(addEventListener, removeEventListener) {

    // roomdata 서버로 send
    const sendRoomdataToServer = async (roomData) => {
      
    };
  
    // Room Data 저장
    // 방 생성 누르면 호출
    const SaveRoomData = useCallback((roomData) =>{
      // RoomDataList에 roomData JSON 정보 저장
      console.log(roomData);
    });
  
    useEffect(() => {
      addEventListener("SendStudyRoomData", SaveRoomData);
      return () => {
        removeEventListener("SendStudyRoomData", SaveRoomData);
      };
    }, [addEventListener, removeEventListener, SaveRoomData]);
  }