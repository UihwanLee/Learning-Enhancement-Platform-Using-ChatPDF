import logo from './logo.svg';
import './App.css';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

import './TTS.js';
import { speak } from './TTS.js';

function App() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "Build/Build.loader.js",
      dataUrl: "Build/Build.data",
      frameworkUrl: "Build/Build.framework.js",
      codeUrl: "Build/Build.wasm",
    });

  function TestA() {
    sendMessage("ButtonManager", "BtnClick");
  }

  function send_prompt() {
    sendMessage("PromptManager", "ShowPrompt", "Test Prompt Message: 'hello!'");
  }

  function TTS_Text() {
    speak('Hello world', window.speechSynthesis)
  }

  return (
    <div className="App">
        <button onClick={TestA}>버튼 유니티 호출</button>
        <button onClick={send_prompt}>Prompt 테스트 호출</button>
        <button onClick={TTS_Text}>TTS</button>
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
