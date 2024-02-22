mergeInto(LibraryManager.library, {
  SendAnswer: function (answer) {
    window.dispatchReactUnityEvent("SendAnswer", UTF8ToString(answer));
  },
  ReplayQuestion: function () {
    window.dispatchReactUnityEvent("ReplayQuestion");
  },
  StartSTT: function () {
    window.dispatchReactUnityEvent("StartSTT");
  },
  StopSTT: function () {
    window.dispatchReactUnityEvent("StopSTT");
  },
});