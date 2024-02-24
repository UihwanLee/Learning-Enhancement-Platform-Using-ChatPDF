mergeInto(LibraryManager.library, {
  RequestData: function () {
    window.dispatchReactUnityEvent("RequestData");
  },
  SendRoomData: function (roomData) {
    window.dispatchReactUnityEvent("SendRoomData", UTF8ToString(roomData));
  },
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