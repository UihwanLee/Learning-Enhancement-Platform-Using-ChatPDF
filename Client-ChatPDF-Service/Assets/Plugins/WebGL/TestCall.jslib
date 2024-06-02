mergeInto(LibraryManager.library, {
  RequestData: function () {
    window.dispatchReactUnityEvent("RequestData");
  },
  StartInterview: function (roomData) {
    window.dispatchReactUnityEvent("StartInterview", UTF8ToString(roomData));
  },
  SendStudyRoomData: function (roomData) {
    window.dispatchReactUnityEvent("SendStudyRoomData", UTF8ToString(roomData));
  },
  SendInterviewRoomData: function (roomData) {
    window.dispatchReactUnityEvent("SendRoomData", UTF8ToString(roomData));
  },
  SendEvaluateRoomData: function (roomData) {
    window.dispatchReactUnityEvent("SendEvaluateRoomData", UTF8ToString(roomData));
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
  RequestStudyRoomData: function (roomData) {
    window.dispatchReactUnityEvent("RequestStudyRoomData", UTF8ToString(roomData));
  },
  RequestInterviewRoomData: function (roomData) {
    window.dispatchReactUnityEvent("RequestInterviewRoomData", UTF8ToString(roomData));
  },
  RequestEvaluateRoomData: function (roomData) {
    window.dispatchReactUnityEvent("RequestEvaluateRoomData", UTF8ToString(roomData));
  },
});