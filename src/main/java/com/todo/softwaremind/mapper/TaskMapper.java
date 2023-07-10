package com.todo.softwaremind.mapper;

import com.todo.softwaremind.model.Task;
import com.todo.softwaremind.model.TaskDto;
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

    public List<TaskDto> mapTaskListToTaskDtoList(List<Task> tasks) {
        return tasks.stream().map(this::mapTaskToDto).toList();
    }
}
