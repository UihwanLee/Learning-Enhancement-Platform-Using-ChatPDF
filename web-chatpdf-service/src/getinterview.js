import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [interviewRooms, setInterviewRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nickname = 'Uihwan'; // 요청할 닉네임

    axios.get(`http://localhost:3001/room/interviewRooms/${nickname}`)
      .then(response => {
        setInterviewRooms(response.data);
        setLoading(false); // 데이터 로딩 완료
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태 해제
      });
  }, []);

  // 로딩 상태 확인
  if (loading) {
    return <div>Loading...</div>;
  }

  // 데이터가 없는 경우
  if (!interviewRooms.length) {
    return <div>No rooms found for this nickname.</div>;
  }

  // 데이터가 있는 경우, 인터뷰 룸 정보를 표시
  return (
    <div>
      <h1>Interview Rooms for {nickname}</h1>
      {interviewRooms.map(room => (
        <div key={room._id}>
          <h2>{room.title}</h2>
          <p>Nickname: {room.nickname}</p>
          <p>Category: {room.category}</p>
          <p>Interview Time: {room.interviewTime} minutes</p>
          {/* 추가적으로 필요한 데이터 표시 */}
        </div>
      ))}
    </div>
  );
}

export default App;
