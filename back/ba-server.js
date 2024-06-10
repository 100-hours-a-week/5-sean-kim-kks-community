const express = require('express');
const app = express();
const port = 3001; 
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//db연결
const db = require("./config/mysql.js");
const conn = db.init();
db.connect(conn);

//base64를 위한 json 파서 최대 크기 증가
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json()); 
app.use(cors());


app.use(cookieParser());
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS가 아닌 경우 false로 설정
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 여기서부터 라우트 설정
const postRoute = require("./router/postRouter")
app.use("/posts", postRoute);

const CommentRoute = require("./router/commentRouter")
app.use("/comments", CommentRoute)

const userRoute = require("./router/userRouter")
app.use("/users", userRoute)

//경로설정
app.use(express.static("../front/public"));

console.log("__dirname is:", __dirname);

//포트 연결 확인
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});