import React, { useCallback, useEffect } from "react";

export function useFILEUPLOADEventListener(addEventListener, removeEventListener, fileInput) {

    // 파일 입력 요소에 대한 ref 생성
    //const fileInput = React.useRef(null);

    // 파일 업로드
    const RequestUpload = useCallback(() =>{
      // RoomDataList에 roomData JSON 정보 삭제
      fileInput.current.click();
    });

    const handleChange = (e) => {
        // 선택한 파일 정보를 콘솔에 출력
        console.log(e.target.files[0]);
    
        // 서버에 보내기
      };
  
    useEffect(() => {
      addEventListener("RequestUploadFile", RequestUpload);
      return () => {
        removeEventListener("RequestUploadFile", RequestUpload);
      };
    }, [addEventListener, removeEventListener, RequestUpload]);

    return(
        <input
                type="file"
                ref={fileInput}
                onChange={handleChange}
                style={{ display: "none" }}
            />
    )
  }