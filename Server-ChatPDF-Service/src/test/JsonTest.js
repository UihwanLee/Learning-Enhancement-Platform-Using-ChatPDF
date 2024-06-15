const result = {};
const str = "80/정확한 답변입니다/더 구체적이면 좋을거 같습니다#50/답은 파리입니다/수도에 대해 더 공부해보세요#40/모범답변/종합의견#20/모범답변/종합의견#100/모범답변/종합의견";

// '#'로 구분된 섹션을 분리
const sections = str.split('#');

// 각 섹션을 '/'로 나누어 result 객체에 저장
sections.forEach((section, index) => {
    result[index] = section.split('/');
});

console.log(result);



