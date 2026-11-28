import { Link, useNavigate, useParams } from 'react-router-dom';
import { findMockArticle } from '../mocks/articles.js';
import { formatDate } from '../utils/formatDate.js';

function ArticleMeta({ article, onDelete }) {
  return (
    <div className="article-meta">
      <span className="author">{article.authorNickname}</span>
      <span className="date">{formatDate(article.createdAt)}</span>

      <span className="article-actions-inline">
        <button className="btn btn-sm btn-outline-secondary" type="button">
          <i className="ion-edit" /> 수정
        </button>
        &nbsp;
        <button className="btn btn-sm btn-outline-danger" type="button" onClick={onDelete}>
          <i className="ion-trash-a" /> 삭제
        </button>
      </span>
    </div>
  );
}

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = findMockArticle(id);

  // 지금은 mock 데이터라 실제로 지우지 않고 홈으로만 이동한다.
  // API 연결 후 DELETE /api/articles/{id} 호출로 바꾼다.
  const handleDelete = () => {
    if (window.confirm('이 글을 삭제할까요?')) {
      navigate('/');
    }
  };

  if (!article) {
    return (
      <div className="container not-found">
        <h2>게시글을 찾을 수 없습니다.</h2>
        <Link to="/">홈으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <span className="region-tag">
            <i className="ion-location" /> {article.region}
          </span>
          <h1>{article.title}</h1>
          <ArticleMeta article={article} onDelete={handleDelete} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p className="article-body">{article.body}</p>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
