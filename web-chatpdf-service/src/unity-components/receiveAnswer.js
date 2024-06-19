import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { speak } from "../TTS";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export function useReceiveAnswerEventListener(addEventListener, removeEventListener, answer, setAnswer, question, setQuestion, SendQuestion, questions, EndInterviewPre, EndInterview, sendMessage, resetTranscript2) {
  //const questions = ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"];
  console.log("questions: ", questions);
  const [idx, setIdx] = useState(0);
  //const [tailQuestion,  setTailQuestion] = useState("");

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
  const ReceiveAnswerPre = useCallback(async (answer) => {
    console.log("ReceiveAnswerPre 호출됨 - ", answer);
    if (idx < questions.length) {
      sendMessage("PromptManager", "AddQuestionLog", questions[idx]);
      setAnswer(answer);
      sendAnswerToServerPre(answer);
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
          EndInterviewPre(); 
        }
        return nextIdx;
      });
    }  
  }, [idx, questions, setAnswer, sendMessage]);

  const sendAnswerToServerPre = async (answer) => {
    try {
      const response = await axios.post('http://localhost:3001/prompt/preSendAnswer', {
        answer: answer
      });
      
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  // Unity->React 사용자의 answer 보내기
  useEffect(() => {
    addEventListener("SendAnswerPre", ReceiveAnswerPre);
    return () => {
      removeEventListener("SendAnswerPre", ReceiveAnswerPre);
    };
  }, [addEventListener, removeEventListener, ReceiveAnswerPre]);

  let isTailQuestion = false;
  let tailCount = 0;
  let tailQuestion = "";
  const ReceiveAnswer = useCallback(async (answer) => {
    console.log("ReceiveAnswer 호출됨 - ", answer);
    if (idx < questions.length) {
      const question = (isTailQuestion) ? tailQuestion : questions[idx];
      sendMessage("PromptManager", "AddQuestionLog", question);
      setAnswer(answer);
      sendMessage("PromptManager", "AddAnswerLog", answer);

      // 2초 딜레이
      await delay(2000);
      
      const YesOrNo = await axios.post('http://localhost:3001/prompt/YesOrNo', {
        question: questions[idx],
        answer: answer
      });
      console.log("YesOrNo: ", YesOrNo);

      // sendAnswerToServer 값이 "Yes" 인 경우
      if(YesOrNo.data === "Yes" && tailCount < 2){
        console.log("Yes임");

        tailCount = tailCount + 1;
        isTailQuestion = true;
        const TailQuestion = await axios.post('http://localhost:3001/prompt/generateTailQuestion', {
          question: questions[idx],
          answer: answer
        });
        console.log("TailQuestion: ", TailQuestion);
        speak(TailQuestion.data, window.speechSynthesis);
        sendMessage("ButtonManager", "SetVoiceUI", 1);
        SendQuestion(TailQuestion.data);
        //setTailQuestion(TailQuestion.data);
        tailQuestion = TailQuestion.data;

        let questionLength = (TailQuestion.data.length)*160;
        // 3초 후에 실행
        setTimeout(() => {
          sendMessage("ButtonManager", "SetVoiceUI", 0);
        }, questionLength);
      } 
      else {
        // sendAnswerToServer 값이 "No" 인 경우
        console.log("No임");
        tailCount = 0;
        setIdx(prevIdx => {
          const nextIdx = prevIdx + 1;
          if (nextIdx < questions.length) {
            speak(questions[nextIdx], window.speechSynthesis);
            sendMessage("ButtonManager", "SetVoiceUI", 1);
            console.log("idx: ", nextIdx);
            console.log("questions[nextIdx]: ", questions[nextIdx]);
            SendQuestion(questions[nextIdx]);
            isTailQuestion = false;
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
      
    }  
  }, [idx, questions, setAnswer, sendMessage]);

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
  const StopSTTpre = useCallback(async() =>{
    console.log("StopSTTpre 호출됨 - ", answer);
    if (idx < questions.length) {
      sendMessage("PromptManager", "AddQuestionLog", questions[idx]);
      setAnswer(answer);
      sendAnswerToServerPre(answer);
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
          EndInterviewPre(); 
        }
        return nextIdx;
      });
    }  
    
    stopListening();
  });

  const StopSTT = useCallback(async() =>{
    console.log("StopSTT 호출됨 - ", answer);
    if (idx < questions.length) {
      const question = (isTailQuestion) ? tailQuestion : questions[idx];
      sendMessage("PromptManager", "AddQuestionLog", question);
      setAnswer(answer);
      sendMessage("PromptManager", "AddAnswerLog", answer);

      // 2초 딜레이
      await delay(2000);
      
      const YesOrNo = await axios.post('http://localhost:3001/prompt/YesOrNo', {
        question: questions[idx],
        answer: answer
      });
      console.log("YesOrNo: ", YesOrNo);

      // sendAnswerToServer 값이 "Yes" 인 경우
      if(YesOrNo.data === "Yes" && tailCount < 2){
        console.log("Yes임");

        tailCount = tailCount + 1;
        isTailQuestion = true;
        const TailQuestion = await axios.post('http://localhost:3001/prompt/generateTailQuestion', {
          question: questions[idx],
          answer: answer
        });
        console.log("TailQuestion: ", TailQuestion);
        speak(TailQuestion.data, window.speechSynthesis);
        sendMessage("ButtonManager", "SetVoiceUI", 1);
        SendQuestion(TailQuestion.data);
        //setTailQuestion(TailQuestion.data);
        tailQuestion = TailQuestion.data;

        let questionLength = (TailQuestion.data.length)*160;
        // 3초 후에 실행
        setTimeout(() => {
          sendMessage("ButtonManager", "SetVoiceUI", 0);
        }, questionLength);
      } 
      else {
        // sendAnswerToServer 값이 "No" 인 경우
        console.log("No임");
        tailCount = 0;
        setIdx(prevIdx => {
          const nextIdx = prevIdx + 1;
          if (nextIdx < questions.length) {
            speak(questions[nextIdx], window.speechSynthesis);
            sendMessage("ButtonManager", "SetVoiceUI", 1);
            console.log("idx: ", nextIdx);
            console.log("questions[nextIdx]: ", questions[nextIdx]);
            SendQuestion(questions[nextIdx]);
            isTailQuestion = false;
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
      
    }
    
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
    addEventListener("StopSTTPrev", StopSTTpre);
    return () => {
      removeEventListener("StopSTTPrev", StopSTTpre);
    };
  }, [addEventListener, removeEventListener, StopSTTpre])

  useEffect(() => {
    addEventListener("StopSTT", StopSTT);
    return () => {
      removeEventListener("StopSTT", StopSTT);
    };
  }, [addEventListener, removeEventListener, StopSTT])
  
}