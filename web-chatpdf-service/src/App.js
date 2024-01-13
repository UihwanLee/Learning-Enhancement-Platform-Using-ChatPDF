import logo from './logo.svg';
import './App.css';
import React, { useCallback, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import './TTS.js';
import { speak } from './TTS.js';

function App() {
  const [prompt, setPrompt] = useState("Hello world");

  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "Build/Build.loader.js",
      dataUrl: "Build/Build.data",
      frameworkUrl: "Build/Build.framework.js",
      codeUrl: "Build/Build.wasm",
    });

  const handleReactCall = useCallback((prompt) => {
    Listen_Prompt()
    setPrompt(prompt)
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
    sendMessage("PromptManager", "ShowPrompt", prompt);
  }

  function Listen_Prompt() {
    speak(prompt, window.speechSynthesis)
  }

  return (
    <div className="App">
        <button onClick={TestA}>버튼 유니티 호출</button>
        <button onClick={send_prompt}>Prompt 테스트 호출</button>
        <button onClick={Listen_Prompt}>TTS</button>
        <Unity style={{
            width: '90%',
            height: '100%',
            justifySelf: 'center',
            alignSelf: 'center',
        }} unityProvider={unityProvider} />
    </div>
  );
}

export default App;
