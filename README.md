# CERTICOS BOOKS

> Kakao Books API를 활용한 도서 검색 및 찜 목록 관리 웹 애플리케이션

## 프로젝트 개요

CERTICOS BOOKS는 Kakao Books API를 기반으로 도서를 검색하고, 관심 있는 도서를 찜 목록에 저장해 관리할 수 있는 웹 애플리케이션입니다.

사용자는 일반 검색과 상세 검색을 통하어 원하는 도서를 찾을 수 있으며, 검색 결과는 무한 스크롤 방식으로 탐색할 수 있습니다. 최근 검색어와 찜 목록은 localStorage에 저장하여 브라우저를 새로고침해도 유지되도록 구현했습니다.

검색어와 상세 검색 조건은 URL Query String과 동기화했습니다. 검색 결과 URL을 새로고침하거나 공유하거나, 브라우저 뒤로가기로 복귀하는 경우 동일한 검색 조건을 복원할 수 있습니다.

상단 내비게이션의 도서검색 메뉴는 초기 검색 화면으로 이동하는 진입점으로 두어, 검색 조건 없이 기본 화면을 보여주도록 구성했습니다.

---

## 실행 방법 및 환경 설정

### 요구 환경

| 항목    | 버전    |
| ------- | ------- |
| Node.js | 18 이상 |
| npm     | 9 이상  |

### 의존성 설치

```bash
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 Kakao REST API Key를 설정합니다.

```env
VITE_KAKAO_REST_API_KEY=YOUR_KAKAO_REST_API_KEY
```

### 개발 서버 실행

```bash
npm run dev
```

기본 실행 주소는 다음과 같습니다.

```text
http://localhost:5173
```

### 빌드

```bash
npm run build
```

### 린트

```bash
npm run lint
```

---

## 기술 스택

| 분류         | 기술                 | 사용 목적                                                       |
| ------------ | -------------------- | --------------------------------------------------------------- |
| Language     | TypeScript           | API 응답, 검색 파라미터, 컴포넌트 Props 타입 안정성 확보        |
| UI Library   | React 19             | 컴포넌트 기반 UI 구성                                           |
| Build Tool   | Vite                 | 빠른 개발 서버와 빌드 환경 구성                                 |
| Routing      | React Router DOM     | 페이지 라우팅 및 URL Query String 기반 검색 상태 관리           |
| Server State | TanStack React Query | 서버 상태, 로딩, 에러, 무한 스크롤 데이터 관리                  |
| HTTP Client  | Axios                | Kakao API 요청 및 공통 API 클라이언트 구성                      |
| Styling      | Emotion              | Theme 기반 디자인 토큰과 CSS-in-JS 스타일링                     |
| Animation    | Framer Motion        | 상세검색 팝업, 검색 기록, 카드 인터랙션의 자연스러운 애니메이션 |
| Lint         | ESLint               | 코드 품질 및 컨벤션 관리                                        |
