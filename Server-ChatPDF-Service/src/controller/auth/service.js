//const crypto = require('crypto');

// // 안전한 시크릿 키 생성 함수
// function generateSecretKey() {
//     return crypto.randomBytes(64).toString('base64');
// }

// // 시크릿 키 생성 및 출력
// const jwtSecretKey = generateSecretKey();
// console.log('Generated JWT Secret Key:', jwtSecretKey);

// JWT 검증을 위한 미들웨어
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer 토큰 형식

    if (token == null) {
        console.log("인증 토큰 없음");
        return res.sendStatus(401); // 인증 토큰 없음
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("토큰 유효하지 않음");
            return res.sendStatus(403); // 토큰 유효하지 않음
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
};


