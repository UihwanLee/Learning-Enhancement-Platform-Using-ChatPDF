require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// 서버 시작
function startServer() {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

startServer();

module.exports = app;