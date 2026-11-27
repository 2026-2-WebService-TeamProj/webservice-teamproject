package com.webservice.travel.article;

import com.webservice.travel.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 여행 후기 게시글 (핵심 Entity)
 * - 작성자(User)와 N:1 관계: 한 사용자가 여러 글을 쓸 수 있다.
 */
@Entity
@Table(name = "articles")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA용 기본 생성자, 외부에서 빈 객체 생성 방지
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 작성자 FK (articles.user_id → users.id), 필요할 때만 조회하도록 LAZY
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    // 지역 태그 (예: 제주, 부산) — 지역별 검색에 사용
    @Column(nullable = false, length = 30)
    private String region;

    // TourAPI 관광지 ID (14주차 확장 기능, 지금은 비어 있어도 됨)
    @Column(name = "place_id", length = 30)
    private String placeId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Builder
    private Article(User user, String title, String body, String region, String placeId) {
        this.user = user;
        this.title = title;
        this.body = body;
        this.region = region;
        this.placeId = placeId;
    }

    /** 게시글 수정 (PUT /api/articles/{id}) */
    public void update(String title, String body, String region) {
        this.title = title;
        this.body = body;
        this.region = region;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
