const express = require('express');
const cookieParser = require('cookie-parser');
const models = require('./models/index.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// DB 연결 확인
models.sequelize
  .sync()
  .then(() => {
    console.log(' DB 연결 성공');
  })
  .catch((err) => {
    console.log('연결 실패');
    console.log(err);
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
