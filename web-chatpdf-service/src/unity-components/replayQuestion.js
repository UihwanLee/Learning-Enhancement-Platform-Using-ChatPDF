import { useCallback, useEffect } from "react";
import { speak } from "../TTS";

export function useReplayQuestionEventListener(addEventListener, removeEventListener, question) {
  const replayQuestion = useCallback(() => {
    speak(question, window.speechSynthesis); // 여기서 question은 전역 변수가 아닌지 확인하세요.
  }, [question]);

  useEffect(() => {
    addEventListener("ReplayQuestion", replayQuestion);
    return () => {
      removeEventListener("ReplayQuestion", replayQuestion);
    };
  }, [addEventListener, removeEventListener, replayQuestion]);
}