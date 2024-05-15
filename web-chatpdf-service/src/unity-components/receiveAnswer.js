import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { speak } from "../TTS";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function useReceiveAnswerEventListener(addEventListener, removeEventListener, answer, setAnswer, question, setQuestion, SendQuestion, questions, EndInterview, sendMessage, resetTranscript2) {
  //const questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];
  console.log("questions: ", questions);
  const [idx, setIdx] = useState(0);

    // TTS 기능 
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

  // 마이크 녹음 함수
  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();


  // useEffect(() => {
  //   if(idx < questions.length){
  //     setQuestion(questions[idx]);
  //     speak(questions[idx], window.speechSynthesis);

  //     //sendMessage("PromptManager", "AddQuestionLog", questions[idx]);
  //     console.log("idx: ", idx);
  //     console.log("questions[idx]: ", questions[idx]);
  //     SendQuestion(questions[idx]);
      
  //   } else{
  //     setQuestion("질문이 없습니다.");
  //     //EndInterview();
  //   }
  // }, [EndInterview, SendQuestion, idx, questions, setQuestion]);

  // 딜레이 함수
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 사용자의 answer 받기
  // send 눌렀을 때 호출 -> send 누르면 text(answer) 서버에 보냄
  const ReceiveAnswer = useCallback(async (answer) => {
    console.log("ReceiveAnswer 호출됨 - ", answer);

    if (idx < questions.length) {
      sendMessage("PromptManager", "AddQuestionLog", questions[idx]);
      setAnswer(answer);
      sendAnswerToServer(answer);
      sendMessage("PromptManager", "AddAnswerLog", answer);

      // 2초 딜레이
      await delay(2000);

      setIdx(prevIdx => {
        const nextIdx = prevIdx + 1;
        if (nextIdx < questions.length) {
          speak(questions[nextIdx], window.speechSynthesis);
          sendMessage("ButtonManager", "SetVoiceUI", 1);
          console.log("idx: ", nextIdx);
          console.log("questions[nextIdx]: ", questions[nextIdx]);
          SendQuestion(questions[nextIdx]);
          let questionLength = (questions[nextIdx].length)*160;
          
          // 3초 후에 실행
          setTimeout(() => {
            sendMessage("ButtonManager", "SetVoiceUI", 0);
          }, questionLength); 

        } else {
          EndInterview(); // POST 요청 포함
        }
        return nextIdx;
      });
    }  
  }, [idx, questions, setAnswer, sendMessage]);

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

  ////////////////////////////////////////////////////////////////////////////

  const StartSTT = useCallback(async() =>{
    console.log("start stt");
    await resetTranscript2();
    await startListening();
    sendMessage("InterviewManager", "SetInterviewerAnimThink", 1);
  });


  // API 질문 다시 듣기
  const StopSTT = useCallback(async() =>{
    sendMessage("InterviewManager", "SetInterviewerAnimThink", 0);
    if (idx < questions.length) {
      sendMessage("PromptManager", "AddQuestionLog", questions[idx]);
      setAnswer(answer);
      sendAnswerToServer(answer);
      sendMessage("PromptManager", "AddAnswerLog", answer);

      // 2초 딜레이
      await delay(2000);

      setIdx(prevIdx => {
        const nextIdx = prevIdx + 1;
        if (nextIdx < questions.length) {
          speak(questions[nextIdx], window.speechSynthesis);
          console.log("idx: ", nextIdx);
          console.log("questions[nextIdx]: ", questions[nextIdx]);
          SendQuestion(questions[nextIdx]);
        } else {
          // 라우터 POST 요청
          EndInterview();
        }
        return nextIdx;
      });
    }  
    // if(idx < question.length){
    //   console.log("start idx: ", idx);
    //   console.log("questions[idx]: ", questions[idx]);
    //   sendMessage("PromptManager", "AddQuestionLog", questions[idx]);
    //   setAnswer(transcript);
    //   sendAnswerToServer(transcript);
    //   sendMessage("PromptManager", "AddAnswerLog", transcript);
    //   idx = idx + 1;
      //setIdx(prevIdx => prevIdx + 1);
    
    stopListening();
  });

  // Unity->React 마이크 녹음 시작 호출
  useEffect(() => {
    addEventListener("StartSTT", StartSTT);
    return () => {
      removeEventListener("StartSTT", StartSTT);
    };
  }, [addEventListener, removeEventListener, StartSTT])

  // Unity->React 마이크 녹음 중지 호출
  useEffect(() => {
    addEventListener("StopSTT", StopSTT);
    return () => {
      removeEventListener("StopSTT", StopSTT);
      //console.log("answer:", answer);
    };
  }, [addEventListener, removeEventListener, StopSTT])
  
}
