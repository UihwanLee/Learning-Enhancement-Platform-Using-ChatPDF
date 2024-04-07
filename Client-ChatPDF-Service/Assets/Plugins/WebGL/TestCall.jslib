mergeInto(LibraryManager.library, {
  RequestData: function () {
    window.dispatchReactUnityEvent("RequestData");
  },
  StartInterview: function () {
    window.dispatchReactUnityEvent("StartInterview");
  },
  SendStudyRoomData: function (roomData) {
    window.dispatchReactUnityEvent("SendStudyRoomData", UTF8ToString(roomData));
  },
  SendInterviewRoomData: function (roomData) {
    window.dispatchReactUnityEvent("SendRoomData", UTF8ToString(roomData));
  },
  DeleteInterviewRoomData: function (roomID) {
    window.dispatchReactUnityEvent("DeleteInterviewRoomData", roomID);
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
  RequestUploadFile: function () {
    window.dispatchReactUnityEvent("RequestUploadFile");
  },
});