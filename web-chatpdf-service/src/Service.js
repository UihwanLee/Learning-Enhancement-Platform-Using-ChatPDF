import logo from './logo.svg';
import './App.css';
import React, { useCallback, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import './TTS.js';
import { speak } from './TTS.js';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import Header from './components/Header'

function Service() {
  // 질문과 답변
  const [question, setQuestion] = useState("Question");
  const [answer, setAnswer] = useState("Answer");

  // react-unity-package 설정
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "Build/Build.loader.js",
      dataUrl: "Build/Build.data",
      frameworkUrl: "Build/Build.framework.js",
      codeUrl: "Build/Build.wasm",
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
  const ReceiveAnswer = useCallback((answer) => {
    setAnswer(answer)
    console.log(answer);
  }, [answer]);

  // API 질문 다시 듣기
  const ReplayQuestion = useCallback(() =>{
    speak(question, window.speechSynthesis)
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

  // React->Unity API 질문 보내기
  function SendQuestion() {
    sendMessage("PromptManager", "ReceiveQuestion", question);
  }

  // API 질문 다시 듣기
  const StopSTT = useCallback(() =>{
    setAnswer(transcript)
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
    speak(answer, window.speechSynthesis)
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
        <button onClick={SendQuestion}>질문 전송</button>
        <button onClick={ListenAnswer}>답변 듣기</button>
    </div>
  );
}

export default Service;
