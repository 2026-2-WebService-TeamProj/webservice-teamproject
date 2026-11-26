# Team 08 — 여행 후기 블로그

여행 후기를 작성하고, 지역·관광지별로 다른 사람의 후기를 모아 보는 웹서비스입니다.

## 폴더 구조

```
.
├── frontend/   # React (Vercel 배포)
├── backend/    # Spring Boot + JPA + MariaDB (Render 배포)
└── docs/       # ERD, API 명세 등 설계 자료
```

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Frontend | React |
| Backend | Spring Boot 4, Spring Data JPA, Validation, springdoc-openapi(Swagger) |
| DB | MariaDB |

## Backend 실행 방법

1. MariaDB에 DB 생성

   ```sql
   CREATE DATABASE travel_blog CHARACTER SET utf8mb4;
   ```

2. DB 계정을 환경변수로 설정 (비밀번호는 저장소에 올리지 않습니다)

   ```bash
   export DB_USERNAME=root
   export DB_PASSWORD=비밀번호
   ```

3. IntelliJ에서 `backend/` 폴더를 Gradle 프로젝트로 열고 `TravelApplication` 실행
4. Swagger UI: http://localhost:8080/swagger-ui.html

> Gradle Wrapper(`gradlew`)가 없다면 IntelliJ 오른쪽 Gradle 탭 → Tasks → build setup → `wrapper`를 한 번 실행한 뒤 생성된 파일을 커밋해 주세요.

## 협업 규칙

- 브랜치: `main` (배포) ← `develop` (통합) ← `feature/*` (기능 개발)
- 각자 Organization 저장소를 Fork → `feature/*` 브랜치에서 작업 → Organization의 `develop`으로 PR → 상대방 리뷰 후 Merge
- 커밋 메시지: `type: 작업 내용` (feat, fix, docs, refactor, test, chore)
  - 예) `feat: add article CRUD API`

## 팀원

| 이름 | 담당 |
| --- | --- |
| 진희원 | (작성 예정) |
| 류다은 | (작성 예정) |
