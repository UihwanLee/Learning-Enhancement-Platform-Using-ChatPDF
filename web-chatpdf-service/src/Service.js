import logo from './logo.svg';
import './App.css';
import React, { useCallback, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import axios from "axios";

import './TTS.js';
import { populateVoiceList } from './TTS.js'
import { speak } from './TTS.js';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import Header from './components/Header'

import { useUnityProvider } from "./unity-components/buildUnity.js";
import { useReplayQuestionEventListener } from "./unity-components/replayQuestion.js";

function Service() {
  // 질문과 답변
  const [question, setQuestion] = useState("Question");
  const [answer, setAnswer] = useState("Answer");

  // 리스트 형태의 roomData
  const [roomList, setRoomList] = useState([]);
  // 질문 배열
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  

  // react-unity-package 설정
  const { unityProvider, sendMessage, addEventListener, removeEventListener } = useUnityProvider();

  // Server 데이터 받기
  const RequestData = useCallback(() =>{
    console.log("데이터 요청받음!");
    // roomlist 초기화
    

    // Scene 상태 보내기

    // USER Nickname 데이터 보내기
    //sendRoomdataToServer();

    // ROOM DATA 보내기
    for(let i=0; i<roomList.length; i++)
    {
      SendRoomData(roomList[i]);
    }

    // ChatPDF와의 log 데이터 보내기

  });

  // roomdata 서버로 send
  const sendRoomdataToServer = async (roomData) => {
    try {
      const response = await axios.post('http://localhost:3001/room/RoomData', {
        roomData: roomData
      });
      
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  // Room Data 저장
  // 방 생성 누르면 호출
  const SaveRoomData = useCallback((roomData) =>{
    // RoomDataList에 roomData JSON 정보 저장
    console.log(roomData);
    sendRoomdataToServer(roomData);
  });

  
 
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

  useEffect(() => {
    if(idx < questions.length){
      setQuestion(questions[idx]);
      speak(questions[idx], window.speechSynthesis);
      console.log(questions[idx]);
      SendQuestion(questions[idx]);
      
    } else{
      setQuestion("질문이 없습니다.");
      //EndInterview();
    }
  }, [idx]);

  // 사용자의 answer 받기
  // send 눌렀을 때 호출 -> send 누르면 text(answer) 서버에 보냄
  const ReceiveAnswer = useCallback((answer) => {
    if(idx < question.length){
      setAnswer(answer);
      sendAnswerToServer(answer);
      setIdx(prevIdx => prevIdx + 1);
    }  
  }, [answer]);
  
  

  const sendAnswerToServer = async (answer) => {
    try {
      const response = await axios.post('http://localhost:3001/prompt/sendAnswer', {
        answer: answer, 
      });
      
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  // API 질문 다시 듣기 이벤트 리스너 추가
  useReplayQuestionEventListener(addEventListener, removeEventListener, question);


  // Unity->React 사용자의 answer 보내기
  useEffect(() => {
    addEventListener("SendAnswer", ReceiveAnswer);
    return () => {
      removeEventListener("SendAnswer", ReceiveAnswer);
    };
  }, [addEventListener, removeEventListener, ReceiveAnswer]);

  // Unity-> React Server 데이터 통신 요구
  useEffect(() => {
    addEventListener("RequestData", RequestData);
    return () => {
      removeEventListener("RequestData", RequestData);
    };
  }, [addEventListener, removeEventListener, RequestData])

  // Unity-> React Room Data 저장
  useEffect(() => {
    addEventListener("SendRoomData", SaveRoomData);
    return () => {
      removeEventListener("SendRoomData", SaveRoomData);
    };
  }, [addEventListener, removeEventListener, SaveRoomData])


  // React->Unity API 질문 보내기
  function SendQuestion(question) {
    sendMessage("PromptManager", "ReceiveQuestion", question);
  }

  // React->Unity NickName 보내기
  function SendNickName(nickname) {
    sendMessage("Server", "LoadUserData", nickname);
  }

  // React->Unity Room Data JSON 파일 보내기
  function SendRoomData(roomData) {
    sendMessage("Server", "LoadRoomData", roomData);
  }

  // 질문 5개 끝나면 나가기 UI 출력
  function EndInterview() {
    sendMessage("ButtonManager", "NoticeEndInterview");
  }

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript])

  const StartSTT = useCallback(() =>{
    console.log("start stt");
    resetTranscript();
    startListening();
  });


  // API 질문 다시 듣기
  const StopSTT = useCallback(() =>{
    
    console.log("stop stt");
    //sendAnswerToServer(answer);
    stopListening();
    
    //endAnswerToServer(answer);
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
      addEventListener("StopSTT", StopSTT);
      console.log("answer:", answer);
    };
  }, [addEventListener, removeEventListener, StopSTT])

  // 면접 시작 버튼 클릭 이벤트 호출 구현
  const StartInterview = useCallback(() =>{
    console.log("면접 시작");
    axios.get('http://localhost:3001/prompt/getQuestions')
      .then(response => {
        setQuestions(response.data);
        console.log("questions: ", response.data);
        setQuestion(response.data[0]);
        speak(response.data[0], window.speechSynthesis);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    
    
  });




  // unity -> react, 면접 시작 버튼 클릭 이벤트 호출
  useEffect(() => {
    addEventListener("StartInterview", StartInterview);
    return () => {
      addEventListener("StartInterview", StartInterview);
    };
  }, [addEventListener, removeEventListener, StartInterview])

  

  function ListenAnswer() {
    const voices = populateVoiceList(window.speechSynthesis)
    speak(answer, window.speechSynthesis)
  }

  async function RequestServer()
  {
    // TO DO LIST
    try{
      // 질문 말하고 Subtitle로 전송
      speak(question, window.speechSynthesis);
      //SendQuestion();
    }
    catch (error) {
      console.error('Error fetching data - question:', error);
    }
  }

  function getEval(){
    const evalData = axios.get('http://localhost:3001/prompt/eval')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <div className="App">
        <Header element="nexon" />
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>{transcript}</p>
        <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={StopSTT}
        onMouseUp={StopSTT}
        >Hold to talk</button>
        <button onClick={resetTranscript}>Reset</button>
        <br/>
        <br/>
        <Unity style={{
            width: '84%',
            height: '100%',
            justifySelf: 'center',
            alignSelf: 'center',
        }} unityProvider={unityProvider} />
        <br/>
        <h1>question: {question}</h1>
        <h1>answer: {answer}</h1>
        <h1>transcript: {transcript}</h1>
        <button onClick={RequestServer}>면접시작</button>
        <button onClick={SendQuestion}>질문 전송</button>
        <button onClick={ListenAnswer}>답변 듣기</button>
        <button onClick={getEval}>질문 답변 평가하기</button>
        <button onClick={EndInterview}>나가기 테스트</button>
    </div>
  );
}

export default Service;
