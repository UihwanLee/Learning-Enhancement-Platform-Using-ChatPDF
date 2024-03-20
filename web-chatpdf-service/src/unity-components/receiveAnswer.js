import { useCallback, useEffect } from "react";

export function useReceiveAnswerEventListener(addEventListener, removeEventListener, setAnswer) {
  const receiveAnswer = useCallback((answer) => {
    setAnswer(answer);
    console.log(answer);
  }, [setAnswer]);

  useEffect(() => {
    addEventListener("SendAnswer", receiveAnswer);
    return () => {
      removeEventListener("SendAnswer", receiveAnswer);
    };
  }, [addEventListener, removeEventListener, receiveAnswer]);
}