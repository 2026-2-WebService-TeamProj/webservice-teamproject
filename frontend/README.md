# Frontend (React)

Conduit(RealWorld) 화면 구조를 바탕으로 생성형 AI를 활용해 여행 후기 블로그 화면으로 수정한 React 앱입니다.

## 실행
```bash
cd frontend
npm install
npm run dev
```

## 화면 (13주차, Mock Data)
| 경로 | 화면 | 담당 |
|---|---|---|
| `/` | 홈 (임시, 글 목록 화면으로 교체 예정) | |
| `/articles/:id` | 여행 후기 상세 | 진희원 |

- Mock 데이터: `src/mocks/articles.js` (백엔드 `ArticleResponse`와 같은 필드)
- 스타일: Conduit 테마를 참고해 `src/index.css`에 직접 작성 (원본 테마 CSS 서버가 응답하지 않음)

## 배포 (Vercel)
- Root Directory: `frontend`
- Framework Preset: Vite
- `vercel.json`으로 새로고침 시 라우팅 404 방지
