const express = require('express');
const app = express();
const port = 3001; 
const path = require('path');
const fs = require('fs');
const cors = require('cors');

app.use(cors());

// 여기서부터 라우트 설정
const postRoute = require("./router/postRouter")
app.use("/posts", postRoute);

//경로설정
app.use(express.static('../front/public'));



//경로 확인 
// app.get('/', function (req, res){
//     console.log('현재 실행중인 파일의 디렉터리 절대 경로 : '+__dirname);
    
// });

//파일 get 요청 보내서 열기
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../front/public/login.html');
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '../front/public/signup.html');
});

app.get('/checkpostlist', (req, res) => {
    res.sendFile(__dirname + '../front/public/checkpostlist.html');
});

app.get('/createpost', (req, res) => {
    res.sendFile(__dirname + '../front/public/createpost.html');
});

app.get('/detailpost', (req, res) => {
    res.sendFile(__dirname + '../front/public/detailpost.html');
});

app.get('/modifyinfo', (req, res) => {
    res.sendFile(__dirname + '../front/public/modifyinfo.html');
});

app.get('/modifypasswd', (req, res) => {
    res.sendFile(__dirname + '../front/public/modifypasswd.html');
});

app.get('/moidifypost', (req, res) => {
    res.sendFile(__dirname + '../front/public/modifypost.html');
});

//에러
app.use((req, res, next) => {
    res.status(404).send('not found');
})

//에러
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message)
})

//포트 연결 확인
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


