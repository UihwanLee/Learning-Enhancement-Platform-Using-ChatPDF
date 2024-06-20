import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button> // 로그아웃 버튼
  );
}

export default LogoutButton;

