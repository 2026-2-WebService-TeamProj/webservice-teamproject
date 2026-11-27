package com.webservice.travel.article.dto;

import com.webservice.travel.article.Article;

import java.time.LocalDateTime;

/**
 * 게시글 응답 DTO
 * - Entity를 그대로 반환하지 않고, 화면에 필요한 값만 담아 반환한다.
 * - 작성자는 User 객체 전체 대신 id와 닉네임만 노출한다.
 */
public record ArticleResponse(
        Long id,
        String title,
        String body,
        String region,
        String placeId,
        Long authorId,
        String authorNickname,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {

    /** Entity → DTO 변환 (생성·조회·수정·검색 응답에서 공통으로 사용) */
    public static ArticleResponse from(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getBody(),
                article.getRegion(),
                article.getPlaceId(),
                article.getUser().getId(),
                article.getUser().getNickname(),
                article.getCreatedAt(),
                article.getUpdatedAt()
        );
    }
}
