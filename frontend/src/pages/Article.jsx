import React from 'react'
import { ArticleMeta, ArticleComments } from '../components'
import { useArticleQuery } from '../hooks'

// Conduit 원본 Article 페이지를 여행 후기 상세 화면으로 수정
// - 제목 위에 여행 지역 태그 추가
// - 본문 줄바꿈(문단) 유지, 소개(description)는 부제목으로 표시
// - 태그 목록 표시
function Article() {
  const { data } = useArticleQuery()
  const { title, description, body, region, tagList = [] } = data.article

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          {region && (
            <span className="region-tag">
              <i className="ion-location" /> {region}
            </span>
          )}
          <h1>{title}</h1>
          <ArticleMeta />
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            {description && <p className="article-description">{description}</p>}
            <p className="article-body">{body}</p>
            {tagList.length > 0 && (
              <ul className="tag-list">
                {tagList.map((tag) => (
                  <li key={tag} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <hr />
        <div className="article-actions">
          <ArticleMeta />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <ArticleComments />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
