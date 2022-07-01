# ![sparkle20](https://user-images.githubusercontent.com/30680187/176836739-8dfc226b-d3a1-4e48-8d46-c69a4599aa57.png) 이상한 리그의 엘리스

<div>

엘리스 레이서를 위한 **RIOT API 기반의 전적검색 사이트** 입니다.

</div>

<br />

## 1. github 주소(현재 비공개이며, 추후 배포 예정)

### https://github.com/ne5s/not-gg

<br />

## 2. 서비스 소개

**기술 스택** <br />

< FrontEnd >
   * VanillaJS, CSS, HTML
   * Bootstrap

< BackEnd >
   * MongoDB/mongoose
   * NodeJS/ExpressJS
      
<br />

## 3. 서비스 요약


* 회원가입 / 로그인 구현
* 소환사의 최근 20경기에 대한 전적검색
* 엘리스 내 랭킹 페이지
* 듀오 찾기 페이지
* 내전(5vs5) 찾기 페이지


<br />

## 4. 프로젝트 팀원 역할 분담

| 이름 | 담당 업무 |
| ------ | ------ |
| 연은빈 | 프론트엔드/디자인 개발 |
| 김한얼 | 프론트엔드 개발 |
| 조영환 | 프론트엔드 개발 |
| 오승준 | 백엔드 개발 |
| 장종원 | 팀장/백엔드 개발 |

<br />

## 5. 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```


2. 클론한 디렉토리에서 backend 디렉토리로 들어가 아래 명령어를 통해 backend에서 필요한 module 설치

```bash
npm install
```


3. backend에서 필요한 `.env` 설정

```bash
MONGODB_URL=<몽고DB URL>
PORT=5555
JWT_SECERT_KEY=<랜덤 문자열>
```


4. express 앱을 실행

```bash
npm run start
```

5. 각종 API를 Postman으로 확인
```bash
Postman으로 Endpoint API 확인 시 MONGODB_URL, PORT, JWT_SECRET_KEY, RIOT_API_KEY 정상인지 확인
```

6. API 정상 작동 확인
```bash
MongoDB Compass 등을 이용하여 DB에 잘 저장되었는 지 확인
```
<br>

## 6. 버전
### 1.0.0

<br>

## 7. FAQ
<details><summary>1. 현재 배포된 상태인가요?</summary>

  <p>
    현재 배포는 아직 되어있지 않으며, 개발완료 시 github pages를 통해 배포예정입니다.
  </p>

</details>
