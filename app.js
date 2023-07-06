import express from 'express';
const cookieParser = require('cookie-parser');
const db = require('./models/index.js');
const routes = require('./routes/index.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);

// DB 연결 확인
db.sequelize
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
