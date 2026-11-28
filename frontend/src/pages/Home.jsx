import { Link } from 'react-router-dom';
import { mockArticles } from '../mocks/articles.js';

// 임시 홈 화면: 상세 화면으로 들어가는 링크만 둔다.
// 글 목록 화면은 별도 작업에서 이 파일을 교체한다.
export default function Home() {
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">travelog</h1>
          <p>여행의 기록을 나누는 곳</p>
        </div>
      </div>

      <div className="container page">
        {mockArticles.map((article) => (
          <div className="article-preview" key={article.id}>
            <Link to={`/articles/${article.id}`} className="preview-link">
              <h1>{article.title}</h1>
              <p>{article.region} · {article.authorNickname}</p>
              <span>자세히 보기</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
