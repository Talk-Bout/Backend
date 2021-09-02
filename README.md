# Talk'Bout 토크부트
항해99 마지막 실전프로젝트!
부트캠프를 찾아 헤매는 여러분을 위한 유일무이한 대화의 장,토크 어바웃 부트캠프, 토크부트입니다💬

#   토크 부트 (Back-end)


![Img](https://github.com/skylermbang/Backend/blob/main/img/talkboot_insta_1200x628_2.jpg)


<!--
## 목차
1. [토크 부트 소개](#토크부트-소개)
2. [개요](#개요)
3. [개발환경](#기능정보)
4. [기능정보](#기능정보)
5. [DB 설계](#DB-설계) 
6. [API 설계](#API-설계)
7. [힘들었던 점 및 개선](#힘들었던-점-및-개선)
8. [상세 설명 페이지](#상세-설명-페이지)
-->

## 🔦 웹 사이트
- [https://talkbout.camp](https://talkbout.camp)
  
## 💡 토크부트 소개

- 실제 부트캠프 수강중인 학생과 수료자에게 듣는 리뷰. 
- 자신에게 맞는 부트캠프 정보를 한눈에 찾아보세요.
- 부트캠프에 대한 질문 과 답변도 확인할수있습니다.


## 🔍 Target
- 개발자가 꿈인 대학생 20대 
- 커리어 전환을 목표로하는 30대
- 짧은시간동안  집중하여 개발 공부를 하고싶은사람. 


## 📌 개요 
- 이름: talkbout 토크부트
- 기간: 2021.07.25 ~ 2021.09.03
- 팀원
  - Front-end(React): 이동민
  - Back-end(Node.js): 정창길, 송하영 ,방민수
  - Designer(UI/UX): 윤영미, 양서문

## 🔌 개발 환경
- Server: AWS EC2(Ubuntu 18.06 LTS)
- Framework: Express(Typescript.js)
- ORM : Prisma 
- Database: Amzon RDS (MySQL)
- Image Server : AWS S3

## Architecture 
![img](https://github.com/skylermbang/Backend/blob/main/img/architecture.png)

## 🔭 주요 라이브러리
axios, class-validator, passport,  multer,  dotenv, helmet ,cors, sharp


## ✨ 주요 기능
#### 1. 로그인
- 구글, 카카오 계정 소셜 로그인 방식
- 토큰 

#### 2. 부트캠프 리뷰 
- 현재 시중의 11개의 부트캠프 정보와 리뷰를 작성하고 조회할수있습니다.
- 부트캠프의 이름 순으로 정렬됩니다.
- 원하는 부트캠프를 찜할수잇습니다.
- 부트캠프 리뷰시 별점을 줄수있습니다.

#### 3. 자유게시판 
- 자유로운 주제를 사진과 함께 글작성 할수잇습니다
- 사진을 업로드시 자동으로 가로 400px 자동으로 리사이징 됩니다. (s3 imgae server , sharp 라이브러리 사용)
- 좋은 정보글은 스크랩하여 나중에 따로 확인할수있습니다.
- 댓글 및 좋아요기능으로 소통할수있습니다.


#### 4. 질문게시판 
- 원하는 질문 게시글에 답변을 남길 수 있습니다.
- 마음에 드는 답변 과 질문에 좋아요를 남길 수 있습니다.
- 자기가 쓴 질문과 답변은 수정 및 삭제를 할 수 있습니다.

#### 5. 정렬  
- 상황에 따라 인기도 정렬 (별점순), 이름명순 , 최근순으로 정렬이 가능합니다.



## DB 설계 
![image](db imgage )


## 주요 API

- 상세 API : https://www.notion.so/09bc5eb473c24d5f9d3b16af489f8e5a?v=b514565b275a4983ad21eddb53331c07 <br>


## 힘들었던 점 및 개선 사항


#### 서버 성능 개선
- 사용자가 프로필 사진을 변경하면 서버에서는 multer 라이브러리를 사용하여 S3저장소에 파일을 업로드하고, DB에 그 위치를 저장하도록 하였습니다. 어떤 사진이든 바로 저장하다 보니, 사용자가 불러올 사진의 크기가 매우 컸고 개선할 필요가 있었습니다. 해결책으로 sharp 라이브러리를 사용하여 적은 용량으로 사진을 리사이징하여 저장하였습니다. 결과적으로, 사용자에게 더 빠르게 페이지를 보여줄 수 있었습니다.


#### 보안
-  CORS설정으로 허가된 주소로만  API서버에 접근할수있도록 허용하여 보안성을 높였습니다.
- 사용자와 안전하게 데이터를 주고 받을 수 있도록 https를 사용하였습니다. 다행히 aws에서 SSL인증서를 발급 받을 수 있었고, 90일 마다 자동으로 갱신 되도록 
- 리프레쉬 토큰 과 토큰 


#### Prisma 
#### 관계형데이터베이스 
#### 타입 스크립트
#### 객체지향 프로그래밍 OOP - MVC 패턴
#### Passport 로그인 구현 


## 프로젝트 초기 기획 노션
- https://www.notion.so/Talk-Bout-_-_5-90d8e8f4f3904dfb84b3892b94daa7d0

## Front-End(React) 코드 
- https://github.com/Talk-Bout/Frontend
