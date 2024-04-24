const express = require('express');
const app = express();
const port = 8080; 
const path = require('path');
const fs = require('fs');
const cors = require('cors');

app.use(cors());


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


// 게시글 삭제 -> json 파일 적용 실패실패실패
// const postsFilePath = path.join(__dirname, '../../data/post.json');

// app.delete('/posts/:postId', (req, res) => {
//   const postId = req.params.postId;

//   fs.readFile(postsFilePath, (err, data) => {
//     if (err) {
//         res.status(500).send('서버에서 파일을 읽는 중 오류가 발생했습니다.');
//         return;
//     }
//     // JSON 데이터 파싱
//     const posts = JSON.parse(data);
//     // 요청된 postId와 일치하지 않는 항목만 필터링
//     const filteredPosts = posts.filter(post => post.id.toString() !== postId);

//     // 변경된 데이터를 파일에 다시 쓰기
//     fs.writeFile(postsFilePath, JSON.stringify(filteredPosts, null, 2), (err) => {
//         if (err) {
//             res.status(500).send('게시글 삭제 중 오류가 발생했습니다.');
//             return;
//         }
//         res.send('게시글이 성공적으로 삭제되었습니다.');
//     });
// });

// })
