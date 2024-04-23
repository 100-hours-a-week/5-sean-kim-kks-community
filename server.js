const express = require('express');
const app = express();
const port = 8080; 

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.use((req, res, next) => {
  res.status(404).send('not found');
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).sen(err.message)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// // 회원가입 api 구현

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// const users =[
//   { id: 2, name: "유저2"},
//   { id: 3, name: "유저3"},
//   { id: 4, name: "유저4"}
// ];


// //400버 
// app.post('/public/signup.html', (req, res) => {
//   const {email, password, nickname, profile_image} = req.body;

//   if (!email || !password || !nickname ) {
//     return res.status(400),json({
//       message : "invalid_request",
//       data : null
//     });
//   }

//     res.status(201).json({
//       message : "register_sucess",
//       data : {
//         user_id: 1
//       }
//     });
// });

// // 500번 
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message : "internal_server_error",
//     data : null
//   });
// });