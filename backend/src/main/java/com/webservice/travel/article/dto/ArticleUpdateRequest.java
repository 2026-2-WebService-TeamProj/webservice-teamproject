package com.webservice.travel.article.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ArticleUpdateRequest(

        @NotBlank(message = "제목을 입력해 주세요.")
        @Size(max = 100, message = "제목은 100자 이내로 입력해 주세요.")
        String title,

        @NotBlank(message = "본문을 입력해 주세요.")
        String body,

        @NotBlank(message = "지역을 입력해 주세요.")
        @Size(max = 30, message = "지역은 30자 이내로 입력해 주세요.")
        String region
) {
}
