package com.webservice.travel.article;

import com.webservice.travel.article.dto.ArticleResponse;
import com.webservice.travel.article.dto.ArticleUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticle(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.getArticle(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticleResponse> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleUpdateRequest request) {
        return ResponseEntity.ok(articleService.updateArticle(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}