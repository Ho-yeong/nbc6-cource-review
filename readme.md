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