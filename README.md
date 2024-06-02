# TUK 2024 컴퓨터 공학부 졸업 작품

## ChatPDF을 활용한 학습 증진 플랫폼
<br>

![02](https://github.com/UihwanLee/TEST/assets/36596037/9de2b076-2426-4636-9e7e-9a9658f9c7a5)

## 1. 프로젝트 소개

ChatPDF 활용한 학습 증진 플랫폼은 ChatPDF API를 활용하여 웹 서비스에서 운영하는 응용프로그램을 통해 사용자의 학습을 증진해 주는 플랫폼 서비스 입니다.
 - 특정 주제에 대한 지식을 효율적으로 학습 할 수 있게 서비스를 제공함
 - 면접과 같은 환경을 구성하며 학습 평가, 피드백이 이루어지고 평가에 대한 데이터를 분석하여 학습 통계를 제공


## 2. 주제 선정 배경
 - 대학생들의 학습 부진이 일어나고 있음
 - 학습 부진으로 인한 전공 이해도 저하와 취업 시 어려움을 겪을 수 있음
 - 학습 증진 서비스를 이용하여 전공에 대한 흥미와 전공 이해도를 높이고자 함


## 3. 주제 해결 방안
 - 학습 스케줄링 시스템 구현
 - 학습 평가 모델 구현
 - 학습 통계 시스템 구현


## 4. 연구 및 개발 목표
 - 누구나 이용할 수 있는 학습 증진 서비스를 만들기 위해 학습 평가 모델, 학습 통계 데이터를 설계하고 구현하는 것


## 5. 연구 및 개발 내용
 ### Client
  - Unity WebGL을 활용하여 면접 환경 서비스를 위한 클라이언트 구축
  - 학습, 면접, 평가를 위한 Room Data 처리 기능 구현
  - 면접 시 사용자와 상호작용 구현 및 GUI 구현
    
 ### FrontEnd
  - 전체적인 플랫폼 UI 구현
  - 학습 평가, 스케줄링에 따른 사용자의 영역별 숙지율 통계 서비스 기능 구현
  - react rechart를 이용해 통계 데이터에 대한 그래픽 처리 구현
  
  ### Backend
  - Chat PDF API를 이용해 서버와 클라이언트 간 통신 구현
  - node.js를 이용한 서버 구축 및 클라이언트 간 라우터 처리 및 학습 알고리즘 구현현
  - MongoDB와 AWS를 이용한 데이터베이스 관리 및 데이터 처리


## 6. 개발 환경
 - 개발언어: C#, JSP
 - 개발방법론: 애자일
 - 사용 프레임워크: React, Unity, Node.js, WebGL
 - 사용 API 및 패키지: Chat PDF API, react-unity-webgl, recharts
 - DB: MongoDB, AWS


## Members

|Client|FrontEnd|Backend|
|:-----:|:-----:|:-----:|
|![team1](https://github.com/UihwanLee/Learning-Enhancement-Platform-Using-ChatPDF/assets/36596037/fc5c2073-fd68-4d21-b52f-83a9fb6dc5f4)|![team3](https://github.com/UihwanLee/Learning-Enhancement-Platform-Using-ChatPDF/assets/36596037/9fa0c994-4fc2-4b72-bbe0-b906a375a241)|![team2](https://github.com/UihwanLee/Learning-Enhancement-Platform-Using-ChatPDF/assets/36596037/c7dd934b-1d8b-4c72-925b-4266dc115a7a)|
|이의환(https://github.com/UihwanLee)|송정민(https://github.com/jungminsong0302)|이세현(https://github.com/SeHyeonLee-dev)|

## 시스템 구성도

![system](https://github.com/UihwanLee/Learning-Enhancement-Platform-Using-ChatPDF/assets/36596037/6491948a-d3ed-43f6-8ddb-1282e993be31)


## 모듈 구조

> 클라이언트
![client](https://github.com/UihwanLee/Learning-Enhancement-Platform-Using-ChatPDF/assets/36596037/77dce349-7eda-457f-9d89-ca54a35958ff)


> 서버
![서버 디렉토리 구조](https://github.com/UihwanLee/Learning-Enhancement-Platform-Using-ChatPDF/assets/36596037/698471a3-d60d-4a95-875c-52fb1732a7be)

![서버 모듈 설계](https://github.com/UihwanLee/Learning-Enhancement-Platform-Using-ChatPDF/assets/36596037/2b8c6ae0-1bc4-4c2d-9c65-7365d9e45e2d)

