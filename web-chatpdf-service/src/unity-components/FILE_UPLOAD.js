import React, { useCallback, useEffect } from "react";

export function useFILEUPLOADEventListener(addEventListener, removeEventListener, fileInput) {
  
    // 파일 업로드
  const RequestUpload = useCallback(() =>{
    // RoomDataList에 roomData JSON 정보 삭제
    fileInput.current.click();
  });

    useEffect(() => {
      addEventListener("RequestUploadFile", RequestUpload);
      return () => {
        removeEventListener("RequestUploadFile", RequestUpload);
      };
    }, [addEventListener, removeEventListener, RequestUpload]);
  }