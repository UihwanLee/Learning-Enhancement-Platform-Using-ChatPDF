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

function Service() {
  // 질문과 답변
  const [question, setQuestion] = useState("Question");
  const [answer, setAnswer] = useState("Answer");

  // 리스트 형태의 roomData
  const [roomList, setRoomList] = useState([""]);

  // 

  // react-unity-package 설정
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "Build/Build.loader.js",
      dataUrl: "Build/Build.data",
      frameworkUrl: "Build/Build.framework.js",
      codeUrl: "Build/Build.wasm",
    });

  // Server 데이터 받기
  const RequestData = useCallback(() =>{
    console.log("데이터 요청받음!");

    // Scene 상태 보내기

    // USER Nickname 데이터 보내기

    // ROOM DATA 보내기
    for(let i=0; i<roomList.length; i++)
    {
      SendRoomData(roomList[i]);
    }

    // ChatPDF와의 log 데이터 보내기

  });

  // Room Data 저장
  const SaveRoomData = useCallback((roomData) =>{
    // RoomDataList에 roomData JSON 정보 저장
    setRoomList(...roomList, roomData);
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

  // 사용자의 answer 받기
  // send 눌렀을 때 호출 -> send 누르면 text(answer) 서버에 보냄
  const ReceiveAnswer = useCallback((answer) => {
    setAnswer(answer);
    sendAnswerToServer(answer);
  }, [answer]);

  const sendAnswerToServer = async (answer) => {
    try {
      // Axios를 사용하여 Node.js 서버로 POST 요청을 보냅니다.
      const response = await axios.post('http://localhost:3001/api/sendAnswer', {
        // 보낼 데이터를 객체 형태로 전달
        answer: answer, 
      });

      // 서버에서 받은 응답을 출력합니다.
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };


  // API 질문 다시 듣기
  const ReplayQuestion = useCallback(() =>{
    const voices = populateVoiceList(window.speechSynthesis)
    speak(question, voices[3], window.speechSynthesis)
  });

  // Unity->React 사용자의 answer 보내기
  useEffect(() => {
    addEventListener("SendAnswer", ReceiveAnswer);
    return () => {
      removeEventListener("SendAnswer", ReceiveAnswer);
    };
  }, [addEventListener, removeEventListener, ReceiveAnswer]);

  // Unity->React API 질문 다시 듣기 호출
  useEffect(() => {
    addEventListener("ReplayQuestion", ReplayQuestion);
    return () => {
      removeEventListener("ReplayQuestion", ReplayQuestion);
    };
  }, [addEventListener, removeEventListener, ReplayQuestion])

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
  function SendQuestion() {
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

  // API 질문 다시 듣기
  const StopSTT = useCallback(async () =>{
    await setAnswer(transcript);
    sendAnswerToServer(transcript);
    stopListening();
  });

  // Unity->React 마이크 녹음 시작 호출
  useEffect(() => {
    addEventListener("StartSTT", startListening);
    return () => {
      removeEventListener("StartSTT", startListening);
    };
  }, [addEventListener, removeEventListener, startListening])

  // Unity->React 마이크 녹음 중지 호출
  useEffect(() => {
    addEventListener("StopSTT", StopSTT);
    return () => {
      addEventListener("StopSTT", StopSTT);
    };
  }, [addEventListener, removeEventListener, StopSTT])

  function ListenAnswer() {
    const voices = populateVoiceList(window.speechSynthesis)
    speak(answer, voices[1], window.speechSynthesis)
  }

  async function RequestServer()
  {
    // TO DO LIST
    try{
      const createQuestion = await axios.get('http://localhost:3001/api/createQuestion');
      setQuestion(createQuestion.data);

      // 질문 말하고 Subtitle로 전송
      speak(question, window.speechSynthesis);
      SendQuestion();
    }
    catch (error) {
      console.error('Error fetching data - question:', error);
    }
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
    </div>
  );
}

export default Service;
