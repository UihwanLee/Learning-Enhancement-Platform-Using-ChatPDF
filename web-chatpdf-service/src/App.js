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
  const stopListening = () => SpeechRecognition.stopListening();

  const handleReactCall = useCallback((prompt) => {
    setPrompt(prompt)
  }, [prompt]);

  const listenPrompt = useCallback(() =>{
    speak(prompt, window.speechSynthesis)
  });


  useEffect(() => {
    addEventListener("sendPrompt", handleReactCall);
    return () => {
      removeEventListener("sendPrompt", handleReactCall);
    };
  }, [addEventListener, removeEventListener, handleReactCall]);

  useEffect(() => {
    addEventListener("listenPrompt", listenPrompt);
    return () => {
      removeEventListener("listenPrompt", listenPrompt);
    };
  }, [addEventListener, removeEventListener, listenPrompt])

  function send_prompt() {
    sendMessage("PromptManager", "ReceivePrompt", prompt);
  }

  function Listen_Prompt() {
    speak(prompt, window.speechSynthesis)
  }

  function set_prompt_by_audio() {
    setPrompt(transcript)
    stopListening();
  }

  return (
    <div className="App">
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <p>{transcript}</p>
        <button
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={set_prompt_by_audio}
        onMouseUp={set_prompt_by_audio}
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
        <h1>{prompt}</h1>
        <button onClick={send_prompt}>Prompt Unity 전송</button>
        <button onClick={Listen_Prompt}>TTS</button>
    </div>
  );
}

export default App;
