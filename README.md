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

## 🖥 웹 사이트
- [https://talkbout.camp](https://talkbout.camp)

## 👾 토크부트 소개
- 실제 부트캠프 수강중인 학생과 수료자에게 듣는 리뷰. 
- 자신에게 맞는 부트캠프 정보를 한눈에 찾아보세요.
- 부트캠프에 대한 질문 과 답변도 확인할수있습니다.

## 📌 개요 
- 이름: talkbout 토크부트
- 기간: 2021.07.25 ~ 2021.09.03
- 팀원
  - Front-end(React): 이동민
  - Back-end(Node.js): 정창길, 송하영 ,방민수
  - Designer(UI/UX): 윤영미, 양서문

## 🛠Architecture 
![img](https://github.com/skylermbang/Backend/blob/main/img/architecture.png)
- REST API: AWS EC2(Ubuntu 18.04 LTS)
- Framework: Express(TypeScript)
- ORM : Prisma 
- Database: Amazon RDS (MySQL)
- Image Storage : AWS S3

## 📚 주요 라이브러리
axios, class-validator, passport, multer,  dotenv, helmet, cors, sharp


## ✨ 주요 기능
#### 1. 로그인
- 구글, 카카오 계정 소셜 로그인 방식을 사용합니다.
- 리프레시 토큰과 엑세스 토큰을 사용합니다.

#### 2. 부트캠프 리뷰 
- 11개의 부트캠프 정보와 리뷰를 작성하고 조회할 수 있습니다.
- 원하는 부트캠프를 찜할 수 있습니다.
- 부트캠프에 리뷰를 작성하고 별점을 줄 수 있습니다.

#### 3. 자유게시판 
- 자유로운 주제로 사진과 함께 작성 할 수 있습니다
- 인기순 정렬시 (조회수 * 좋아요) 값을 기준으로 정렬해서 보여줍니다. 
- 사진을 업로드시 자동으로 압축됩니다.
- 글을 북마크할 수 있습니다.
- 댓글 및 좋아요 기능으로 소통할 수 있습니다.

#### 4. 질문게시판 
- 원하는 질문 게시글에 답변을 남길 수 있습니다.
- 마음에 드는 답변과 질문에 좋아요를 남길 수 있습니다.
- 답변은 한 번 작성시 수정 또는 삭제할 수 없습니다.

#### 5. 마이페이지
- 자신의 닉네임과 프로필 사진을 수정할 수 있습니다.
- 북마크한 질문 , 자유 게시판 글과 부트캠프를 확인할 수 있습니다. 
- 자신이 작성한 글 목록을 확인할 수 있습니다.


## 🔨 주요 개선 사항
- 코드를 한 사람이 쓴 것처럼 일관된 형태로 고쳤습니다.
- sharp 라이브러리를 사용하여 사진을 압축하여 원본과 함께 저장하였습니다. 사용자에게 더 빠르게 페이지를 보여줄 수 있었습니다.
- 악성 유저의 글 도배를 방지하는 간단한 알고리즘을 적용했고 개선하는 중입니다.
- Amazon RDS와 S3 이미지 저장소를 서버에서 분리해내 서버 부하를 줄였습니다.  


## 주요 API
- API 명세 : <검토 중>

## 프로젝트 초기 기획 노션
- https://www.notion.so/Talk-Bout-_-_5-90d8e8f4f3904dfb84b3892b94daa7d0

## Front-End(React) 깃허브 
- https://github.com/Talk-Bout/Frontend
