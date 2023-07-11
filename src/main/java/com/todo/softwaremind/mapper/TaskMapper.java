package com.todo.softwaremind.mapper;

import com.todo.softwaremind.model.domain.Task;
import com.todo.softwaremind.model.dto.TaskDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TaskMapper {
    public Task mapDtoToTask(TaskDto dto){
        return Task.builder()
                .title(dto.title())
                .content(dto.content())
                .details(dto.details())
                .build();
    }

    public TaskDto mapTaskToDto(Task task){
        return TaskDto.builder()
                .title(task.getTitle())
                .content(task.getContent())
                .details(task.getDetails())
                .build();
    }

    public Page<TaskDto> mapTaskPageToTaskDtoPage(Page<Task> tasks) {
        List<TaskDto> list = tasks.getContent().stream()
                .map(this::mapTaskToDto)
                .toList();
        return new PageImpl<>(list, tasks.getPageable(), tasks.getTotalElements());
    }
}
