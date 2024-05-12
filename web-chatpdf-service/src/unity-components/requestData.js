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
}