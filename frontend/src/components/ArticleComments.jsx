import React from 'react'
import { Link } from 'react-router-dom'
import { useArticleCommentsQuery, useAuth } from '../hooks'
import ArticleComment from './ArticleComment'
import ArticleCommentForm from './ArticleCommentForm'

function ArticleComments() {
  const { isAuth } = useAuth()
  const { data } = useArticleCommentsQuery()

  if (!isAuth) {
    return (
      <p>
        댓글을 남기려면 <Link to="/login">로그인</Link> 또는 <Link to="/register">회원가입</Link>을 해주세요.
      </p>
    )
  }

  return (
    <>
      <ArticleCommentForm />
      {data.comments.map((comment) => (
        <ArticleComment key={comment?.id} comment={comment} />
      ))}
    </>
  )
}

export default ArticleComments
