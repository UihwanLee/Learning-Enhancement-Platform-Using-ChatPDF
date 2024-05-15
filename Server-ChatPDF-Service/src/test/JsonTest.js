const data = {
    currentInterViewRoomData: '{"id":0,"nickname":"Uihwan","title":"운영체제 룸","category":"운영체제","document":"운영체제 테스트 파일.pdf","index":"전체","isPrevInterview":0,"interviewType":0,"interviewerCount":1,"interviewerGender":1,"interviewTime":60.0,"interviewStyle":0}'
  };
  
  // 문자열을 JSON 객체로 변환
  const parsedData = JSON.parse(data.currentInterViewRoomData);
  
  console.log(parsedData.document);