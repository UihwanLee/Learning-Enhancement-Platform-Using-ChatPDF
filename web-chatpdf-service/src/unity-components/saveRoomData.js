import { useCallback, useEffect } from "react";

export function useSaveRoomDataEventListener(addEventListener, removeEventListener) {
  const saveRoomData = useCallback((roomData) => {
    // RoomDataList에 roomData JSON 정보 저장하는 로직을 여기에 추가하세요.
  }, []);

  useEffect(() => {
    addEventListener("SendRoomData", saveRoomData);
    return () => {
      removeEventListener("SendRoomData", saveRoomData);
    };
  }, [addEventListener, removeEventListener, saveRoomData]);
}