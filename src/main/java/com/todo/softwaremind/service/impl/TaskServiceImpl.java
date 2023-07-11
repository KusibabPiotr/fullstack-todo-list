package com.todo.softwaremind.service.impl;

import com.todo.softwaremind.exception.TaskNotFoundException;
import com.todo.softwaremind.mapper.TaskMapper;
import com.todo.softwaremind.model.domain.Task;
import com.todo.softwaremind.model.dto.TaskDto;
import com.todo.softwaremind.repository.TaskRepository;
import com.todo.softwaremind.service.contract.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskDto createTask(TaskDto taskDto) {
        return taskMapper.mapTaskToDto(taskRepository.save(taskMapper.mapDtoToTask(taskDto)));
    }

    public Page<TaskDto> getTasks(String sortBy, String sortDirection, Integer page, Integer pageSize) {
        PageRequest pageRequest = createPageRequest(sortBy, sortDirection, page, pageSize);
        return taskMapper.mapTaskPageToTaskDtoPage(taskRepository.findAll(pageRequest));
    }

    @Override
    public TaskDto updateTask(TaskDto taskDto, Long id) {
        Task taskFromDb = taskRepository.findById(id)
                .orElseThrow(TaskNotFoundException::new);
        taskFromDb.setTitle(taskDto.title());
        taskFromDb.setContent(taskDto.content());
        taskFromDb.setDetails(taskDto.details());
        return taskDto;
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    private PageRequest createPageRequest(String sortBy, String sortDirection, Integer page, Integer pageSize) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        return PageRequest.of(page, pageSize, sort);
    }
}
