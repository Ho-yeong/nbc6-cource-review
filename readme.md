# 세팅 순서

---
1. 필수 라이브러리 설치 및 명령어 세팅
```
npm install -D nodemon @babel/core @babel/node @babel/preset-env
```

```
...
"script": {
        "dev":"nodemon --exec babel-node init.js"
    }
...
```
---
2. app.js 분리
```
init.js 생성
db.js 생성

app.js 에서 실행 소스 init.js 로 분리
```
---
3. 최신 문법으로 수정
```
import ... from '...';
---------
export ...
```
4. 폴더 구조 수정
```
├── babel.config.json
├── constants.js
├── init.js
├── package-lock.json
├── package.json
├── readme.md
└── src
    ├── app.js
    ├── db
    │   ├── db.js
    │   └── models
    │       ├── comment.js
    │       ├── index.js
    │       ├── like.js
    │       ├── post.js
    │       └── user.js
    ├── middleware
    │   └── middleware.js
    ├── migrations
    ├── routes
    │   ├── comment.js
    │   ├── index.js
    │   ├── like.js
    │   ├── post.js
    │   └── user.js
    └── seeders
```
---
5. app.js, init.js server 클래스로 변경, env 설정

---
6. controller, service, router 분리

---
7. DB 연결 수정, build 설정
```
npm install @babel/cli
```