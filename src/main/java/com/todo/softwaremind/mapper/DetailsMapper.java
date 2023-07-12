package com.todo.softwaremind.mapper;

import com.todo.softwaremind.model.domain.Details;
import com.todo.softwaremind.model.dto.DetailsDto;
import org.springframework.stereotype.Component;

@Component
public class DetailsMapper {
    public Details mapDetailsDtoToDetails(DetailsDto detailsDto) {
        return Details.builder()
                .publicId(detailsDto.publicId())
                .created(detailsDto.created())
                .deadLine(detailsDto.deadLine())
                .reportTo(detailsDto.reportTo())
                .uplineEmail(detailsDto.uplineEmail())
                .uplineMobile(detailsDto.uplineMobile())
                .build();
    }

    public DetailsDto mapDetailsToDetailsDto(Details details) {
        return DetailsDto.builder()
                .publicId(details.getPublicId())
                .created(details.getCreated())
                .deadLine(details.getDeadLine())
                .reportTo(details.getReportTo())
                .uplineEmail(details.getUplineEmail())
                .uplineMobile(details.getUplineMobile())
                .build();
    }
}
