import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { speak } from "../TTS";

export function useReceiveAnswerEventListener(addEventListener, removeEventListener, answer, setAnswer, question, setQuestion, SendQuestion, questions, EndInterview) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if(idx < questions.length){
      setQuestion(questions[idx]);
      speak(questions[idx], window.speechSynthesis);
      console.log(questions[idx]);
      SendQuestion(questions[idx]);
      
    } else{
      setQuestion("질문이 없습니다.");
      console.log("eeeeeeeeeeeeeeeeee");
      //EndInterview();
    }
  }, [EndInterview, SendQuestion, idx, questions, setQuestion]);

  // 사용자의 answer 받기
  // send 눌렀을 때 호출 -> send 누르면 text(answer) 서버에 보냄
  const ReceiveAnswer = useCallback((answer) => {
    
    console.log("ReceiveAnswer 호출됨 - ", answer);
    if(idx < question.length){
      setAnswer(answer);
      sendAnswerToServer(answer);
      setIdx(prevIdx => prevIdx + 1);
    }  
  }, [idx, question.length, setAnswer]);

  const sendAnswerToServer = async (answer) => {
    try {
      const response = await axios.post('http://localhost:3001/prompt/sendAnswer', {
        answer: answer, 
      });
      
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  // Unity->React 사용자의 answer 보내기
  useEffect(() => {
    addEventListener("SendAnswer", ReceiveAnswer);
    return () => {
      removeEventListener("SendAnswer", ReceiveAnswer);
    };
  }, [addEventListener, removeEventListener, ReceiveAnswer]);
}