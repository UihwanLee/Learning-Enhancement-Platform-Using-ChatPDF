// 예제 변수
const isRelated = true; // 예제 값
const filePath = '/user/docs/file1.txt'; // 예제 파일 경로

// JSON 데이터 생성
const jsonData = {
  isRelated: isRelated,
  path: filePath
};

// jsonData 객체에서 path 값 추출
const pathValue = jsonData.path;

// 추출한 path 값을 출력
console.log(typeof(jsonData));


