package com.webservice.travel.article.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ArticleUpdateRequest (
    @NotBlank(message = "제목을 입력해 주세요.")
    @Size(max = 20,message = "올바른 제목 값을 입력해 주세요.")
    String title,

    @NotBlank(message = "본문을 입력해 주세요.")
    String body,

    @NotBlank(message = "닉네임을 입력해 주세요.")
    @Size(max = 20, message = "닉네임은 20자 이내로 입력해 주세요.")
    String region
    ){

}
