package com.webservice.travel.article;

import com.webservice.travel.article.dto.ArticleResponse;
import com.webservice.travel.article.dto.ArticleUpdateRequest;
import com.webservice.travel.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleResponse getArticle(Long id) {
        Article article = findArticle(id);
        return ArticleResponse.from(article);
    }

    @Transactional
    public ArticleResponse updateArticle(Long id, ArticleUpdateRequest request) {
        Article article = findArticle(id);
        article.update(request.title(), request.body(), request.region());
        return ArticleResponse.from(article);
    }

    @Transactional
    public void deleteArticle(Long id) {
        Article article = findArticle(id);
        articleRepository.delete(article);
    }

    private Article findArticle(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("게시글을 찾을 수 없습니다. id=" + id));
    }
}