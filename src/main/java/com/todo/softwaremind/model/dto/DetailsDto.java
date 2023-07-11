package com.todo.softwaremind.model.dto;

import com.todo.softwaremind.model.Priority;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record DetailsDto(
        LocalDateTime created,
        LocalDateTime timeline,
        Priority priority
) {
}
