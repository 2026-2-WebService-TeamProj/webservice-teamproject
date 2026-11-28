# Frontend (React)

[RealWorld(Conduit)](https://github.com/gothinkster/realworld)의 React + Vite 오픈소스 구현을 가져와,
생성형 AI를 활용해 여행 후기 블로그(travelog)에 맞게 수정한 프론트엔드입니다.

- 원본 코드: https://github.com/devopsbyte-internal/fe-conduit-react-vite-web
- 원본 라이선스: MIT (Thinkster RealWorld)
- 원본 그대로 가져온 커밋과 수정 커밋을 나눠 두어, 수정한 부분은 커밋 diff로 확인할 수 있습니다.

## 실행
```bash
cd frontend
npm install
npm run dev
```

## 13주차 수정 내용
| 구분 | 내용 |
|---|---|
| 게시글 상세 화면 (`src/pages/Article.jsx`) | 여행 지역 태그 추가, 소개·본문 문단 표시, 태그 목록 표시 (진희원) |
| Mock 데이터 (`src/server.js`) | Mirage mock 서버의 글을 여행 후기(제목·소개·본문·지역)와 여행 태그로 변경 |
| Mock 서버 사용 범위 (`src/main.jsx`) | 백엔드 연결 전이라 배포 환경에서도 Mirage mock 서버 사용 |
| 화면 문구 | 상단바·버튼·날짜를 한국어로, 로고를 travelog로 변경 |
| 테마 CSS (`index.html`) | 원래 테마 CDN이 응답하지 않아 RealWorld 공식 테마(jsDelivr)로 교체 |
| 패키지 | 사용하지 않는 Cypress 테스트 의존성 제거 |

## 배포 (Vercel)
- Root Directory: `frontend`
- Framework Preset: Vite
- `vercel.json`으로 새로고침 시 라우팅 404 방지
