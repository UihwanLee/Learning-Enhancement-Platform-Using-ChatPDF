import logo from './logo.svg';
import './App.css';
import React, { useCallback, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import './TTS.js';
import { speak } from './TTS.js';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [prompt, setPrompt] = useState("Hello world");

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "Build/Build.loader.js",
      dataUrl: "Build/Build.data",
      frameworkUrl: "Build/Build.framework.js",
      codeUrl: "Build/Build.wasm",
    });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  const handleReactCall = useCallback((prompt) => {
    setPrompt(prompt)
    Listen_Prompt()
  }, [prompt]);


  useEffect(() => {
    addEventListener("sendPrompt", handleReactCall);
    return () => {
      removeEventListener("sendPrompt", handleReactCall);
    };
  }, [addEventListener, removeEventListener, handleReactCall]);

  function TestA() {
    sendMessage("ButtonManager", "BtnClick");
  }

  function send_prompt() {
    sendMessage("PromptManager", "ShowPrompt", transcript);
  }

  function Listen_Prompt() {
    speak(prompt, window.speechSynthesis)
  }

  function set_prompt_by_audio() {
    setPrompt(transcript)
    sendMessage("PromptManager", "ShowPrompt", prompt);
  }

  return (
    <div className="App">
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>{transcript}</p>
        <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
        >Hold to talk</button>
        <button onClick={resetTranscript}>Reset</button>
        <br/>
        <Unity style={{
            width: '90%',
            height: '90%',
            justifySelf: 'center',
            alignSelf: 'center',
        }} unityProvider={unityProvider} />
        <br/>
        <button onClick={TestA}>버튼 유니티 호출</button>
        <button onClick={send_prompt}>Prompt Unity 전송</button>
        <button onClick={Listen_Prompt}>TTS</button>
    </div>
  );
}

export default App;
