import { useUnityContext } from "react-unity-webgl";

export function useUnityProvider() {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "Build/Build.loader.js",
      dataUrl: "Build/Build.data",
      frameworkUrl: "Build/Build.framework.js",
      codeUrl: "Build/Build.wasm",
    });
  return { unityProvider, sendMessage, addEventListener, removeEventListener };
}