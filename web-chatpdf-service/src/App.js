import logo from './logo.svg';
import './App.css';
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

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

  return (
    <div className="App">
        <button onClick={TestA}>버튼 유니티 호출</button>
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
