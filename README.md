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
│   └── common/       # Header, EmptyStatus, ErrorStatus 등 공통 UI
├── constants/        # 검색 옵션, Storage Key 등 상수
├── hooks/            # React Query 기반 Custom Hook
├── layouts/          # 공통 레이아웃
├── pages/            # Home, Wish, NotFound 페이지
├── providers/        # QueryProvider, ThemeProvider
├── styles/           # Theme, Typography, Global Style
├── types/            # API 및 도메인 타입 정의
└── utils/            # 가격 포맷팅 등 공통 유틸
```

### 주요 코드 설명

| 파일                                  | 설명                                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `pages/HomePage.tsx`                  | 검색 상태와 URL Query String을 동기화하고 검색 화면을 구성하는 메인 페이지입니다.              |
| `hooks/useInfiniteBookSearchQuery.ts` | React Query의 `useInfiniteQuery`를 활용하여 도서 검색, 무한 스크롤, 페이지네이션을 관리합니다. |
| `api/book.ts`                         | Kakao Books API 요청, 응답 데이터 정규화, API 에러 변환을 담당합니다.                          |
| `components/book/SearchSection.tsx`   | 일반 검색, 상세 검색, 최근 검색어 기능을 하나의 컴포넌트로 관리합니다.                         |
| `components/book/BookList.tsx`        | 검색 결과를 렌더링하고 Intersection Observer를 활용한 무한 스크롤을 제공합니다.                |
| `pages/WishPage.tsx`                  | `localStorage` 기반의 찜 목록을 조회하고 클라이언트 사이드 페이지네이션으로 관리합니다.        |
| `components/common/ErrorStatus.tsx`   | API 오류 유형에 따라 사용자에게 적절한 안내 메시지를 제공합니다.                               |

---

## 5. 라이브러리 선택 이유

| 라이브러리               | 선택 이유                                                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19**             | 컴포넌트 기반으로 UI를 구성하고 상태를 효율적으로 관리하기 위해 사용했습니다.                                                             |
| **TypeScript**           | API 응답, 컴포넌트 Props, 검색 파라미터 등을 정적 타입으로 관리하여 안정성과 유지보수성을 높였습니다.                                     |
| **TanStack React Query** | 서버 상태를 효율적으로 관리하고 `useInfiniteQuery`를 활용하여 무한 스크롤, 캐싱, 로딩 및 에러 처리를 간결하게 구현하기 위해 선택했습니다. |
| **React Router DOM**     | 페이지 라우팅뿐 아니라 `useSearchParams`를 활용하여 검색 상태를 URL Query String과 동기화하기 위해 사용했습니다.                          |
| **Axios**                | 공통 API Client를 구성하여 Authorization Header와 API 요청을 일관성 있게 관리하기 위해 사용했습니다.                                      |
| **Emotion**              | Theme 기반 디자인 토큰을 적용하고 컴포넌트 단위의 스타일을 관리하기 위해 사용했습니다.                                                    |
| **Framer Motion**        | 상세 검색 팝업, 검색 기록, 버튼 인터랙션 등에 자연스러운 애니메이션을 적용하여 사용자 경험을 개선하기 위해 사용했습니다.                  |

## 6. 주요 구현 내용

### 1. React Query 기반 무한 스크롤

**React Query의 `useInfiniteQuery`를 활용하여 서버 상태와 무한 스크롤을 효율적으로 관리했습니다.**

검색어와 상세 검색 조건을 `queryKey`에 포함하여 검색 조건이 변경되면 새로운 검색 결과만 조회하도록 구성했습니다. 또한 Kakao Books API의 `is_end`와 `pageable_count`를 활용해 마지막 페이지 이후에는 추가 요청이 발생하지 않도록 구현했습니다.

이를 통해 불필요한 API 호출을 줄이고, 많은 검색 결과도 자연스럽게 탐색할 수 있도록 했습니다.

---

### 2. URL Query String 기반 검색 상태 관리

**검색 상태를 URL Query String과 동기화하여 검색 흐름이 유지되도록 구현했습니다.**

검색어와 상세 검색 조건을 `useSearchParams`로 관리하여 새로고침, 브라우저 뒤로가기, URL 공유 시에도 동일한 검색 상태를 복원할 수 있도록 구성했습니다.

별도의 전역 상태 라이브러리 없이도 브라우저 히스토리와 검색 상태를 일관성 있게 유지할 수 있었습니다.

---

### 3. 최근 검색어 및 찜 목록 유지

**최근 검색어와 찜 목록을 `localStorage`에 저장하여 사용자 데이터를 유지하도록 구현했습니다.**

최근 검색어는 최대 8개까지 저장하며, 동일한 검색어는 최신 순으로 갱신하도록 처리했습니다. 찜 목록은 ISBN을 기준으로 중복 저장을 방지하여 데이터의 일관성을 유지했습니다.

브라우저를 새로 실행하거나 새로고침해도 사용자가 이전 작업을 이어갈 수 있도록 구성했습니다.

---

### 4. 사용자 경험을 고려한 상태별 UI

**검색 과정에서 발생하는 다양한 상태를 UI로 명확하게 구분하여 사용자 경험을 개선했습니다.**

| 상태           | UI           |
| -------------- | ------------ |
| 로딩           | Skeleton UI  |
| 검색 결과 없음 | Empty Status |
| API 오류       | Error Status |
| 잘못된 경로    | 404 Page     |

특히 Skeleton UI는 실제 도서 카드와 동일한 레이아웃으로 구성하여 레이아웃 이동(Layout Shift)을 최소화하고 자연스러운 로딩 경험을 제공하도록 구현했습니다.

---

### 5. 안정적인 검색 경험을 위한 예외 처리

**검색 과정에서 발생할 수 있는 다양한 예외 상황을 고려하여 안정적인 사용자 경험을 제공하도록 구현했습니다.**

API 오류는 인증(`auth`), 호출 한도(`quota`), 잘못된 요청(`invalid-request`), 네트워크(`network`) 등으로 구분하여 상황에 맞는 안내 메시지를 제공했습니다.

또한 IME Composition Event를 활용하여 한글 입력 중 Enter 키가 중복 실행되는 문제를 방지함으로써, 영문과 한글 입력 모두 동일한 검색 경험을 제공하도록 구성했습니다.

---

## 7. 향후 개선 방향

현재 프로젝트는 요구사항 구현과 사용자 경험 개선에 중점을 두었으며, 이후에는 다음과 같은 방향으로 발전시킬 수 있다고 생각합니다.

| 개선 항목           | 설명                                                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 테스트 코드 추가    | 검색 로직, `localStorage` 유틸, 커스텀 훅 등에 대한 단위 테스트를 작성하여 안정성을 높일 수 있습니다.                                                               |
| API 응답 검증       | Zod와 같은 런타임 검증 도구를 도입하여 외부 API 응답 구조 변경에도 안정적으로 대응할 수 있습니다.                                                                   |
| Storage 로직 분리   | 최근 검색어와 찜 목록의 `localStorage` 접근 로직을 Custom Hook 또는 별도 유틸로 분리하여 재사용성을 높일 수 있습니다.                                               |
| URL 상태 확장       | 현재 관리 중인 `query`, `target`뿐 아니라 `page` 정보까지 URL과 동기화하여 페이지 상태 복원을 강화할 수 있습니다.                                                   |
| Error Retry UI      | 네트워크 오류나 일시적인 API 오류 발생 시 사용자가 직접 다시 시도할 수 있는 Retry UI를 제공할 수 있습니다.                                                          |
| 검색 상태 전역 관리 | 현재는 URL을 통해 검색 상태를 관리하고 있지만, 검색 조건이나 필터가 늘어날 경우 Zustand와 같은 전역 상태 관리 라이브러리를 도입하여 상태 관리를 확장할 수 있습니다. |
