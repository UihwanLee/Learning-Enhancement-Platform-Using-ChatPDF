import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom"
import './login.css';

// 토큰을 로컬 스토리지에서 가져오는 함수
function getToken() {
  return localStorage.getItem('token');
}

// 보호된 API 엔드포인트에 접근하는 함수
function fetchProtectedData() {
  const token = getToken();

  axios.get('http://localhost:3001/auth/protected', {
    headers: {
      // Bearer 스키마를 사용하여 Authorization 헤더에 토큰 추가
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log('Protected data:', response.data);
  })
  .catch(error => {
    console.error('Error fetching protected data:', error);
  });
}

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/user/login', {
        userId,
        password
      });
      localStorage.setItem('token', data.token);
      console.log("token: ", data.token);
      alert('로그인 성공');
      navigate('/');
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;


