async function getData() {
    // 여기서는 간단히 객체를 반환하지만, 실제로는 데이터베이스 쿼리 등이 포함될 수 있습니다.
    return { message: 'Hello from service' };
  }
  
  module.exports = {
    getData
  };