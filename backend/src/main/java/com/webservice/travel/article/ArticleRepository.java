package com.webservice.travel.article;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Article 저장소
 * - 기본 CRUD(save, findById, findAll, delete)는 JpaRepository가 제공
 * - 아래는 메서드 이름으로 조건 검색 쿼리를 만드는 Query Method
 */
public interface ArticleRepository extends JpaRepository<Article, Long> {

    // 전체 목록 최신순 (홈 화면)
    List<Article> findAllByOrderByCreatedAtDesc();

    // 지역 태그로 검색: WHERE region = ? ORDER BY created_at DESC
    List<Article> findByRegionOrderByCreatedAtDesc(String region);

    // 제목 키워드 검색: WHERE title LIKE %keyword% ORDER BY created_at DESC
    List<Article> findByTitleContainingOrderByCreatedAtDesc(String keyword);

    // 특정 사용자가 쓴 글 (프로필 화면): WHERE user_id = ?
    List<Article> findByUserIdOrderByCreatedAtDesc(Long userId);
}
