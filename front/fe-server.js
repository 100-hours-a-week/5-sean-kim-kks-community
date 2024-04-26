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
  res.status(500).send(err.message)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


