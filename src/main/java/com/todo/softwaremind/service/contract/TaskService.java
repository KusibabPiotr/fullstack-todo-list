package com.todo.softwaremind.service.contract;

import com.todo.softwaremind.model.dto.TaskDto;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);

    Page<TaskDto> getTasks(String sortBy, String sortDirection, Integer page, Integer pageSize);

    TaskDto updateTask(TaskDto taskDto, UUID id);

    void deleteTask(UUID id);

    TaskDto getTask(UUID id);
}
