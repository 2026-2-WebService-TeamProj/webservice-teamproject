// 백엔드 ArticleResponse와 같은 모양의 mock 데이터
// 14주차에 API를 연결하면 GET /api/articles/{id} 응답으로 바꿔 끼운다.
export const mockArticles = [
  {
    id: 1,
    title: '제주 3박 4일 동쪽 여행 후기',
    body:
      '첫날은 성산일출봉에서 일출을 보는 것으로 시작했어요. 새벽 5시에 일어나야 해서 힘들었지만, 정상에서 해가 떠오르는 순간은 정말 잊을 수 없었어요.\n\n' +
      '둘째 날에는 우도에 들어가 전기자전거를 빌려 섬을 한 바퀴 돌았어요. 서빈백사 해변의 물 색이 사진보다 훨씬 예뻤고, 땅콩 아이스크림도 꼭 먹어보세요.\n\n' +
      '마지막 날은 비자림 숲길을 천천히 걸으며 여행을 마무리했어요. 동쪽 위주로 다니면 이동 시간이 짧아서 일정이 여유로워요.',
    region: '제주',
    placeId: null,
    authorId: 1,
    authorNickname: '희원',
    createdAt: '2026-11-25T14:30:00',
    updatedAt: '2026-11-26T09:12:00',
  },
  {
    id: 2,
    title: '경주 당일치기 코스 추천',
    body:
      '아침에 KTX로 신경주역에 도착해서 버스로 불국사부터 들렀어요.\n\n' +
      '점심은 황리단길에서 먹고, 오후에는 대릉원과 첨성대를 걸어서 둘러봤어요. 해 질 무렵 동궁과 월지 야경까지 보면 하루 코스로 딱 좋아요.',
    region: '경주',
    placeId: null,
    authorId: 2,
    authorNickname: '다은',
    createdAt: '2026-11-20T18:05:00',
    updatedAt: '2026-11-20T18:05:00',
  },
];

export function findMockArticle(id) {
  return mockArticles.find((article) => article.id === Number(id));
}
