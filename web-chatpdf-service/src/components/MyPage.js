// 예: MyPage.js
import React, { useState, useEffect } from 'react';
import parseJwt from '../jwtUtils';
import LogoutButton from '../logout'; // 로그아웃 버튼 컴포넌트 임포트

function MyPage() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = parseJwt(token);
        if (userData) {
            setUser(userData);
        }
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            <p>User ID: {user.userId}</p>
            <p>Username: {user.username}</p>
            <LogoutButton />
        </div>
    );
}

export default MyPage;




