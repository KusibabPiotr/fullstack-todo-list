package com.todo.softwaremind.model;

import lombok.Builder;

@Builder
public record TaskDto(
        String title,
        String content,
        Details details
) {
}
