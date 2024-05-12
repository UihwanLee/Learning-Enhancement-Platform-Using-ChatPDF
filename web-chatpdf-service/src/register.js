import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom"
import './register.css';

function Register() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/user/register', {
        userId,
        password,
        username
      });
      alert('회원가입이 완료되었습니다');
      // Redirect to login page or clear form fields
      setUserId('');
      setPassword('');
      setUsername('');
      navigate('/');
    } catch (error) {
      alert(error.response.data);
    }
  };


  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
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
        <label htmlFor="username">Nickname</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

