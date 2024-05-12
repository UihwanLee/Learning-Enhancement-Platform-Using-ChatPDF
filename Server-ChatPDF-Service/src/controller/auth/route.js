const express = require('express');
const jwt = require('jsonwebtoken');
const router = express();
router.use(express.json());
require('dotenv').config();

const authService = require('./service');

router.get('/protected', authService.authenticateToken, (req, res) => {
  // 인증된 사용자에 대한 정보 또는 기타 필요한 데이터 응답
  res.json({
      message: 'This is a protected route',
      user: req.user
  });
});


  

module.exports = router;