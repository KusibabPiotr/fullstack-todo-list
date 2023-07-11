package com.todo.softwaremind.service.contract;

import com.todo.softwaremind.model.dto.TaskDto;
import org.springframework.data.domain.Page;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);

    Page<TaskDto> getTasks(String sortBy, String sortDirection, Integer page, Integer pageSize);

    TaskDto updateTask(TaskDto taskDto, Long id);

    void deleteTask(Long id);
}
