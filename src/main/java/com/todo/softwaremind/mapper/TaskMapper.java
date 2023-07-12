package com.todo.softwaremind.mapper;

import com.todo.softwaremind.model.domain.Task;
import com.todo.softwaremind.model.dto.TaskDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TaskMapper {
    private final DetailsMapper detailsMapper;

    public Task mapDtoToTask(TaskDto taskDto){
        return Task.builder()
                .publicId(taskDto.publicId())
                .title(taskDto.title())
                .content(taskDto.content())
                .isDone(taskDto.isDone())
                .details(detailsMapper.mapDetailsDtoToDetails(taskDto.details()))
                .priority(taskDto.priority())
                .build();
    }

    public TaskDto mapTaskToDto(Task task){
        return TaskDto.builder()
                .publicId(task.getPublicId())
                .title(task.getTitle())
                .content(task.getContent())
                .isDone(task.isDone())
                .details(detailsMapper.mapDetailsToDetailsDto(task.getDetails()))
                .priority(task.getPriority())
                .build();
    }

    public Page<TaskDto> mapTaskPageToTaskDtoPage(Page<Task> tasks) {
        List<TaskDto> list = tasks.getContent().stream()
                .map(this::mapTaskToDto)
                .toList();
        return new PageImpl<>(list, tasks.getPageable(), tasks.getTotalElements());
    }
}
