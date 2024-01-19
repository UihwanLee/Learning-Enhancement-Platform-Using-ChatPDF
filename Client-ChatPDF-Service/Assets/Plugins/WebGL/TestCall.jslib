mergeInto(LibraryManager.library, {
  sendPrompt: function (prompt) {
    window.dispatchReactUnityEvent("sendPrompt", UTF8ToString(prompt));
  },
  listenPrompt: function () {
    window.dispatchReactUnityEvent("listenPrompt");
  },
});