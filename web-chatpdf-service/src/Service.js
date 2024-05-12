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
import { useReceiveAnswerEventListener } from "./unity-components/receiveAnswer.js";
import { useFILEUPLOADEventListener } from './unity-components/FILE_UPLOAD.js';
import { useManagerInterviewRoomDataEventListener } from './unity-components/managerInterviewRoomData.js';
import { useRequestDataEventListener } from './unity-components/requestData.js';


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
  // const RequestData = useCallback(() =>{
  //   console.log(answer);
  //   console.log("데이터 요청받음!");

  // });

  // 서버로 데이터 요청
  useRequestDataEventListener(addEventListener, removeEventListener, sendMessage);

  // 인터뷰 룸 데이터 이벤트리스너
  useManagerInterviewRoomDataEventListener(addEventListener, removeEventListener);
 
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

  // API 질문 다시 듣기 이벤트 리스너 추가
  useReplayQuestionEventListener(addEventListener, removeEventListener, question);

  try{
    useReceiveAnswerEventListener(addEventListener, removeEventListener, answer, setAnswer, question, setQuestion, SendQuestion, questions, EndInterview, sendMessage);
  }catch(error){
    console.error('An error occurred:', error);
  }
  

  // Unity-> React Server 데이터 통신 요구
  // useEffect(() => {
  //   addEventListener("RequestData", RequestData);
  //   return () => {
  //     removeEventListener("RequestData", RequestData);
  //   };
  // }, [addEventListener, removeEventListener, RequestData])


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

  const sendAnswerToServer = async (answer) => {
    try {
      setAnswer()
      console.log(answer);
      const response = await axios.post('http://localhost:3001/prompt/sendAnswer', {
        answer: answer, 
      });
      
    } catch (error) {
      console.error('Error sending answer:', error);
    }
  };

  // 면접 시작 버튼 클릭 이벤트 호출 구현
  const StartInterview = useCallback(() =>{
    console.log("면접 시작");
    axios.get('http://localhost:3001/prompt/getQuestions')
      .then(response => {
        setQuestions(response.data);
        console.log("questions: ", response.data);
        sendMessage("PromptManager", "AddQuestionLog", response.data[0]);
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

  function SendImage(){
    const url = "https://tukorea-chatpdf-bucket.s3.ap-northeast-2.amazonaws.com/chap00/chap00-01.jpg";
    sendMessage("PDFViewer", "GetTextureFromURL" , url);
  }


  // 파일 입력 요소에 대한 ref 생성
  const fileInput = React.useRef(null);

  // File upload component
  useFILEUPLOADEventListener(addEventListener, removeEventListener, fileInput);

  const handleChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      console.error('No file selected.');
      return;
    }

    // 파일 확장자 확인
    const fileName = e.target.files[0].name;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  
    const formData = new FormData();
    formData.append('pdfFile', file);

    // 확장자가 pdf 또는 pptx가 아닌 경우
    if (extension !== 'pdf' && extension !== 'pptx') {
      // 오류 메시지 출력
      alert('.pdf 또는 .pptx 파일을 업로드해주세요');
      // 파일 입력 요소 초기화
      e.target.value = '';
  } else {
      // 서버에 보내기
      axios.post('http://localhost:3001/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 500) {
          console.log(error.response.data);
          // 오류 메시지 출력
          alert(error.response.data);
          // 파일 입력 요소 초기화
          e.target.value = '';
        }
      });
  }
    
    
  };
  

  return (
    <div className="App">
        <Header element="nexon" />
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>{transcript}</p>
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
        <button onClick={SendImage}>이미지 테스트</button>
        
        <input
          type="file"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
    </div>
    
  );
}

export default Service;
