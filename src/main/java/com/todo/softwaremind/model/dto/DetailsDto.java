package com.todo.softwaremind.model.dto;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record DetailsDto(
        UUID publicId,
        LocalDateTime created,
        LocalDateTime deadLine,
        String reportTo,
        String uplineEmail,
        String uplineMobile
) {
}
