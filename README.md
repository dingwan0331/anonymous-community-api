# anonymous-community-api

안전하고 자유로운 익명 보장 게시판 api

[Api Docs](http://3.36.70.103:8000/docs)

# 사용기술 스택

- node.js
- express
- sequelize
- mysql
- swagger
- RESTful API

# Database Modeling

## posts table

<img width="585" alt="image" src="https://user-images.githubusercontent.com/100751719/188915773-32eb0bef-7246-480d-976a-63d89566001c.png">

- posts 단일 테이블이며 비밀번호는 암호화하여 저장합니다.
- 논리삭제를 위하여 deletedAt 컬럼이 존재합니다.

# Project Structure

```bash
.
├── apps
│   └── post
│       ├── postModel.js
│       ├── postRouter.js
│       ├── postController.js
│       ├── postService.js
│       └──  postDao.js
├── config
├── middlewares
├── models
├── routes
├── utils
├── app.js
├── server.js
├── .env
├── package-lock.json
└── package.json
```

- apps : 프로젝트에 사용되는 앱들이 있습니다.
  - post : 게시판 앱으로 하위에 게시판과 관련된 소스코드들이 있습니다.
    - postModel.js : 포스트 모델(테이블)을 정의합니다.
    - postRouter.js : 포스트 도메인의 라우터를 관리합니다.
    - postController.js : 요청을 받아 필요한 데이터를 뽑아 서비스 레이어로 전달합니다. 서비스레이어에서 받은 데이터를 반환합니다. 에러를 다음 미들웨어로 전달합니다.
    - postService.js : 유효성검사, 데이터 재조합등 서비스로직을 구현합니다.
    - postDao.js : ORM을 사용하여 DB와 통신합니다.
- config : 프로젝트에 필요한 환경변수들을 env파일에서 import후 변수에담아 export합니다.
- middlewares : req, res에 직접 액세스하는 미들웨어들이 모여있습니다.
- models : sequlize 객체 생성 및 db 커넥팅 셋팅들이 들어있습니다.
- routes : 요청들을 각 앱으로 분기시키는 역할을 합니다.
- utils : 의존성없는 독립 모듈들을 모아놓았습니다.
- app.js : express 인스턴스에 서버 작동시 필요한 미들웨어들을 추가합니다.
- server.js : 포트를 지정후 서버를 엽니다.
- .env : 환경변수를 관리합니다. (.gitignore에 기재 되어있습니다.)

# End-points

게시물 게시 요청

```bash
http -v POST http://3.36.70.103:8000/posts
```

게시물 리스트 조회 요청

```bash
http -v GET http://3.36.70.103:8000/posts
```

# Project 시행 방법

npm(node package module)이 서버에 설치되어있어야 합니다

```
npm install
```

서버실행시 필요한 모듈들을 설치합니다.

```
npm start
```

서버를 실행합니다
