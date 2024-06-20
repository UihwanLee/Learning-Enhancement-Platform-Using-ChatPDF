function cleanData(rawData) {
  // 데이터에서 '!'를 기준으로 분리
  let sections = rawData.split('!');
  let cleanedData = [];

  sections.forEach(section => {
      // 각 섹션을 줄 단위로 분리하고 트림
      let cleanedLine = section.trim();
      // 숫자와 점을 제거한 후 필요없는 공백을 트림
      cleanedLine = cleanedLine.replace(/^\d+\.\s*/, '').trim();
      // 비어 있지 않은 줄만 추출
      if (cleanedLine) {
          cleanedData.push(cleanedLine);
      }
  });

  // 필요한 데이터들 사이에 '!' 추가
  return cleanedData.join('!');
}

// 예제 데이터
let rawData = `1. 스택(Stack) 자료구조를 사용하여 괄호 짝 맞추기 문제를 해결하는 알고리즘을 작성하시오.!
2. 병합 정렬(Merge Sort) 알고리즘을 사용하여 주어진 배열을 정렬하시오.!
3. 그리디 알고리즘을 활용하여 거스름돈을 가장 적게 주는 방법을 찾아보세요.!
4. 다이나믹 프로그래밍을 활용하여 피보나치 수열을 구하는 알고리즘을 작성하시오.!
5. 분할정복 알고리즘을 사용하여 주어진 배열에서 최대 부분합을 구하는 알고리즘을 작성하시오.!`;

let cleanedData = cleanData(rawData);
console.log(cleanedData);


