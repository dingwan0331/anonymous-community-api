# anonymous-community-api

> 안전하고 자유로운 익명 보장 게시판 api

## [Api Docs](http://3.36.70.103:8000/docs)

<br>

# 사용기술 스택

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"><img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">  
<br>
<img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazon ec2&logoColor=white">  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> 
<br>
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">   <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=github actions&logoColor=white">
<br><br>

# TEST 도구

 <img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/supertest-141526?style=for-the-badge&logo=supertest&logoColor=white">

  <br>

# Project Structure

```bash
.
├── .github
├── test
├── src
├── .env
├── package-lock.json
└── package.json
```

- github : GitHub Actions에 필요한 yml파일들이 모여있습니다
- test : test에 필요한 util파일과 테스트코드가 들어있습니다.
- src : 배포시시 필요한 모든 소스코드가 들어 있습니다.(swagger도 포함되어 있습니다.)
- .env : 환경변수를 관리합니다. (.gitignore에 기재 되어있습니다.)
  <br><br>

```bash
src
├── app/post
├── ├── postModel.js
├── ├── postRouter.js
├── ├── postController.js
├── ├── postService.js
├── └──  postDao.js
├── config
├── middlewares
├── models
├── routes
├── utils
├── swagger
├── app.js
├── server.js
└── package.json
```

- apps : 프로젝트에 사용되는 앱들이 있습니다.
  - post : 게시판 앱으로 하위에 게시판과 관련된 소스코드들이 있습니다.
    - postModel.js : 포스트 스키마를 정의합니다.
    - postRouter.js : 포스트 도메인의 라우터를 관리합니다.
    - postController.js : 요청을 받아 필요한 데이터를 뽑아 서비스 레이어로 전달합니다.
      서비스레이어에서 받은 데이터를 반환합니다. 에러를 다음 미들웨어로 전달합니다.
    - postService.js : 유효성검사, 데이터 재조합등 서비스로직을 구현합니다.
    - postDao.js : ORM을 사용하여 DB와 통신합니다.
- config : 프로젝트에 필요한 환경변수들을 env파일에서 import후 변수에담아 export합니다.
- middlewares : req, res에 직접 액세스하는 미들웨어들이 모여있습니다.
- models : mognoDB 스키마와 인스턴스를 관리합니다.
- routes : 요청들을 각 앱으로 분기시키는 역할을 합니다.
- utils : 의존성없는 독립 모듈들을 모아놓았습니다.
- swagger : swagger 설정과 렌더링할 json파일이 있습니다.
- app.js : express 인스턴스에 서버 작동시 필요한 미들웨어들을 추가합니다.
- server.js : DB 커넥트 후 서버 오픈을 합니다.
  <br><br>

# Database Modeling

## Schema

<img width="300" alt="image" src="https://user-images.githubusercontent.com/100751719/191728210-5817b34c-feed-4f83-af2c-1f8d20dc4703.png">

- posts 단일 테이블이며 비밀번호는 암호화하여 저장합니다.
- 논리삭제시 deleted가 true로 바뀌며 deletedAt이 추가됩니다.
  <br><br>

# Project Test 방법

## Local 환경

```
npm ci
```

서버실행시 필요한 모듈들을 설치합니다.

```
npm test
```

테스트를 실행합니다
<br><br>

## 테스트 자동화

아래의 4가지 경우에 Git hub Actions를 통해 test가 자동으로 실행됩니다.

- develop 브랜치에 push
- develop 브랜치에 pr
- main 브랜치에 pr
- main 브랜치에 push (이경우 Docker이미지가 자동으로 DockerHub에 push됩니다.)
  <br><br>

# Project 배포

### 배포시 아래의 3가지가 필요합니다

- dockerhub 계정
- MongoDB cluster
- 배포환경에서 Docker설치

1.  Git-hub secrets에 Docker login에 필요한 정보를 넣어줍니다.

    - DOCKERHUB_USERNAME: dockerhub의 로그인 아이디를 넣어줍니다.
    - DOCKERHUB_PASSWORD: dockerhub의 토근을 넣어줍니다.
      <br><br>

2.  배포용 mognoDB url을 Git-hub secrets에 넣어줍니다.

    - MONGODB_URL : MongoDB cluster의 url을 넣어줍니다.
      <br><br>

3.  배포환경에서 아래의 스크립트 명령어를 입력해줍니다.

    ```
    docker pull <DOCKERHUB_USERNAME>/anonymous-community-api:latest
    ```

    도커허브에서 images를 pull 받아줍니다.

    ```
    docker run -i -t <DOCKERHUB_USERNAME>/anonymous-community-api:latest
    ```

    도커이미지를 실행합니다.(백그라운드 실행시 -d 옵션을 추가해줍니다)

    ### \* <DOCKERHUB_USERNAME>은 Git-hub secrets에 설정한 도커허브 유저이름입니다.

    <br><br>

# Clone 후 프로젝트 실행방법

1. 프로젝트 최상위에 .env 파일을 생성해줍니다.

  - 배포 환경시

  ```bash
  echo PRODUCTION_MONGODB_URL=<mognoDB_url> >> .env
  ```

  - 개발 환경시
  ```bash
  echo DEV_MONGODB_URL=<mognoDB_url> >> .env
  ```
  ### test DB는 별도로 필요하지 않습니다.

2. 의존성 모듈을 설치해 줍니다.

  - 배포 환경시
  ```bash
  npm ci --only=production
  ```
  - 개발 환경시
  ```bash
  npm ci
  ```

3. 프로젝트 실행 스크립트를 입력합니다

  - 배포 환경시
  ```bash
  npm start
  ```
  - 개발 환경시
  ```bash
  npm run dev
  ```

# Trouble Shooting

## 1. MongooseServerSelectionError

![image](https://user-images.githubusercontent.com/100751719/191901169-41f3ddc3-edf7-4c78-af6a-0006c2045b18.png)

위와같은 에러 발생시 MongoDB의 해당 클러스터 선택후<br>
왼쪽의 Network Access에 들어가 허용 IP설정을 해줍니다.<br>
<img width="160" alt="image" src="https://user-images.githubusercontent.com/100751719/191902154-317816e3-8aa5-4264-ab1f-70f785334dcb.png">
<br><br>
