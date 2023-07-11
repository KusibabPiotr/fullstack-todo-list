package com.todo.softwaremind.model.dto;

import com.todo.softwaremind.model.domain.Details;
import lombok.Builder;

@Builder
public record TaskDto(
        String title,
        String content,
        Details details
) {
}
