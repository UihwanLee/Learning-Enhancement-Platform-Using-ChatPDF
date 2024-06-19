import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from './components/MyPage';
import Login from './login';
import BulletinBoard from './components/BulletinBoard';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/service" element={<Login />} />
        <Route path="/bulletinboard" element={<BulletinBoard />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
