# CERTICOS BOOKS

> Kakao Books API를 활용한 도서 검색 및 찜 목록 관리 웹 애플리케이션

## 1. 프로젝트 개요

CERTICOS BOOKS는 Kakao Books API를 활용하여 도서를 검색하고, 관심 있는 도서를 찜 목록에 저장하여 관리할 수 있는 웹 애플리케이션입니다.

사용자는 일반 검색과 상세 검색을 통해 원하는 도서를 찾을 수 있으며, 검색 결과는 무한 스크롤 방식으로 탐색할 수 있습니다. 최근 검색어와 찜 목록은 `localStorage`에 저장하여 새로고침 이후에도 사용 흐름이 이어지도록 구현했습니다.

검색어와 상세 검색 조건은 URL Query String과 동기화하여 새로고침, URL 공유, 브라우저 뒤로가기 시에도 동일한 검색 상태를 복원할 수 있도록 구성했습니다.

상단 내비게이션의 **도서검색** 메뉴는 새로운 검색을 시작하는 진입점으로 두어 검색 조건 없이 기본 화면을 표시하도록 설계했습니다.

---

## 2. 실행 방법 및 환경 설정

### 개발 환경

| 항목    | 버전    |
| ------- | ------- |
| Node.js | 18 이상 |
| npm     | 9 이상  |

### 프로젝트 설치

```bash
npm install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성한 뒤 Kakao REST API Key를 설정합니다.

```env
VITE_KAKAO_REST_API_KEY=YOUR_KAKAO_REST_API_KEY
```

### 개발 서버 실행

```bash
npm run dev
```

기본 실행 주소

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

## 3. 기술 스택

| 분류         | 기술                 |
| ------------ | -------------------- |
| Language     | TypeScript           |
| UI Library   | React 19             |
| Build Tool   | Vite                 |
| Routing      | React Router DOM     |
| Server State | TanStack React Query |
| HTTP Client  | Axios                |
| Styling      | Emotion              |
| Animation    | Framer Motion        |
| Lint         | ESLint               |

---

## 4. 폴더 구조 및 주요 코드 설명

### 폴더 구조

```text
src/
├── api/              # Kakao API 요청 및 공통 에러 처리
├── assets/           # 이미지 및 아이콘 리소스
├── components/
│   ├── book/         # 검색, 상세검색, 도서 카드, 스켈레톤 UI
│   └── common/       # Header, EmptyStatus, ErrorStatus 등 공통 컴포넌트
├── constants/        # 검색 옵션, Storage Key 등 상수
├── hooks/            # React Query 기반 Custom Hook
├── layouts/          # 공통 레이아웃
├── pages/            # Home, Wish, NotFound 페이지
├── providers/        # ThemeProvider, QueryProvider
├── styles/           # Theme, Typography, Global Style
├── types/            # API 및 도메인 타입 정의
└── utils/            # 가격 포맷팅 등 공통 유틸
```

### 주요 코드 설명

| 파일                                  | 설명                                                                  |
| ------------------------------------- | --------------------------------------------------------------------- |
| `pages/HomePage.tsx`                  | 검색 상태와 URL Query를 관리하며 검색 화면을 구성합니다.              |
| `hooks/useInfiniteBookSearchQuery.ts` | React Query를 활용한 무한 스크롤 검색 로직을 담당합니다.              |
| `api/book.ts`                         | Kakao Books API 요청, 응답 정규화(normalize), 에러 처리를 담당합니다. |
| `components/book/SearchSection.tsx`   | 일반 검색, 상세 검색, 최근 검색어 기능을 관리합니다.                  |
| `components/book/BookList.tsx`        | 검색 결과 렌더링과 무한 스크롤을 담당합니다.                          |
| `pages/WishPage.tsx`                  | localStorage 기반 찜 목록을 조회하고 관리합니다.                      |
| `components/common/ErrorStatus.tsx`   | API 오류 상황에 맞는 사용자 메시지를 표시합니다.                      |

---

## 5. 라이브러리 선택 이유

| 라이브러리               | 선택 이유                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **TanStack React Query** | 서버 상태를 효율적으로 관리하고 `useInfiniteQuery`를 통해 무한 스크롤과 로딩, 캐싱을 간결하게 구현하기 위해 선택했습니다. |
| **React Router DOM**     | 페이지 이동뿐 아니라 `useSearchParams`를 활용하여 검색 상태를 URL과 동기화하기 위해 사용했습니다.                         |
| **Axios**                | 공통 API Client를 구성하고 API 요청 및 에러 처리를 일관성 있게 관리하기 위해 사용했습니다.                                |
| **Emotion**              | Theme 기반 디자인 토큰을 적용하고 컴포넌트 단위의 스타일을 관리하기 위해 사용했습니다.                                    |
| **Framer Motion**        | 상세 검색 팝업, 검색 기록, 버튼 인터랙션 등 사용자 경험을 향상시키는 자연스러운 애니메이션을 적용하기 위해 사용했습니다.  |
| **TypeScript**           | API 응답, 컴포넌트 Props, 검색 파라미터 등을 정적 타입으로 관리하여 안정성과 유지보수성을 높였습니다.                     |
