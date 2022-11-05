# 기반이 될 이미지
FROM node:16 

# 작업디렉토리(default)설정
WORKDIR /usr/src/app 

# 현재 패키지 설치 정보를 도커 이미지에 복사
COPY package*.json ./

# 설치정보를 읽어 들여서 패키지를 설치
RUN npm ci --only=production

# git hub secrets에서 mongodb_url을 받아와 .env에 입력합니다. 
RUN --mount=type=secret,id=MONGODB_URL \
  export PRODUCTION_MONGO_URL=$(cat /run/secrets/MONGODB_URL) && \
  echo PRODUCTION_MONGO_URL=$PRODUCTION_MONGO_URL >> .env

# pm2 전역설치
RUN npm i -g pm2

## Copy all src files
COPY ./src ./src

## Run the application on the port 8080
# 8000번 포트를 외부에 개방하도록 설정
EXPOSE 8000   

#  서버를 실행
CMD ["npm", "start"]