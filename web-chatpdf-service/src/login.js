import React, { useState } from 'react';
import Header from './components/Header';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 처리 로직
  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    //필드값 확인
    if (!username || !password) {
      alert('사용자명과 비밀번호를 입력해주세요.');
      return;
    }

    // 서버 부분 넣어야 함
    console.log('로그인 요청을 서버에 보냅니다...');

    alert('로그인에 성공했습니다.');
  };

  return (
    <div>
        <Header element="nexon" />
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* 로그인 버튼 함수 만들어야함 */}
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;
