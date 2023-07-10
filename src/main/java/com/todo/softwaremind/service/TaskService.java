package com.todo.softwaremind.service;

import com.todo.softwaremind.mapper.TaskMapper;
import com.todo.softwaremind.model.TaskDto;
import com.todo.softwaremind.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskDto createTask(TaskDto taskDto) {
        return taskMapper.mapTaskToDto(taskRepository.save(taskMapper.mapDtoToTask(taskDto)));
    }
}
