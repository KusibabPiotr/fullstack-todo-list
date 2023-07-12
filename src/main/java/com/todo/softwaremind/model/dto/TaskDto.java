package com.todo.softwaremind.model.dto;

import com.todo.softwaremind.model.Priority;
import lombok.Builder;

import java.util.UUID;

@Builder
public record TaskDto(
        UUID publicId,
        String title,
        String content,
        boolean isDone,
        DetailsDto details,
        Priority priority
) {
}
