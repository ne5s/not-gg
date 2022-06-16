# 쇼핑몰 웹 서비스 - 기본 코드 Heroku 배포

<div>

<img alt="쇼핑-데모 로고" src="https://i.ibb.co/xSZHxmy/image.png">

</div>

<br />

## 1. 서비스 링크

### https://shopping-mall-racer.herokuapp.com/ 

<br />

## 2. 서비스 소개

#### 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다. 
1. 회원가입, 로그인, 회원정보 수정 및 탈퇴 등 사용자 관련 CRUD를 할 수 있습니다.
2. 카테고리 관련 CRUD, 제품 관련 CRUD, 주문 관련 CRUD할 할 수 있습니다.
3. 장바구니 관련 기능을 프론트 단에서 수행할 수 있습니다.  
4. 관리자 페이지가 있습니다.
5. 추가 기능 ???

<br />

### 2-1. API 문서

### https://documenter.getpostman.com/view/19463141/Uz5JHvXh

<br>

### 2-2. 데모 영상

<details><summary>사용자 회원가입, 로그인</summary>

![image](https://user-images.githubusercontent.com/91174156/172159634-1e105633-9948-464e-a540-5429200a1353.gif)

</details>

<details><summary>카테고리 추가 및 반영</summary>

관련 영상 삽입해야 함 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)
   
</details>

<details><summary>제품 추가 및 반영</summary>

관련 영상 삽입해야 함 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>장바구니 기능</summary>

관련 영상 삽입해야 함 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>주문 기능</summary>

관련 영상 삽입해야 함 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>관리자 페이지</summary>

관련 영상 삽입해야 함 (하기 2가지 방법 가능)
1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입  
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<br />

### 2-3. 페이지 별 화면

|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
| ![image](https://i.ibb.co/jyxjcd3/image.png) | ![image](https://i.ibb.co/Q860RKz/image.png) |
|    메인 페이지                                |      회원가입 화면                            |
| ![image](https://i.ibb.co/RpYN379/image.png) | ![]()                                        |
|    로그인 페이지                              |     추가해야 할 페이지                         |

<br />


## 3. 기술 스택

![image](https://i.ibb.co/N34mXzy/image.png)

<br />

## 4. 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

<br />

## 5. 제작자

| 이름 | 담당 업무 |
| ------ | ------ |
| 김광태 | 튜터 |

<br />

## 6. 실행 방법

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
PORT=5000
JWT_SECERT_KEY=<랜덤 문자열>
```


4. express 앱을 실행

```bash
npm run start
```

<br>

## 7. 버전
### 1.0.0

<br>

## 8. FAQ
<details><summary>1. 현재 배포도 GCP를 이용한 것인가요?</summary>

  <p>
    현재 배포는 Heroku를 사용하였습니다.
  </p>

</details>
