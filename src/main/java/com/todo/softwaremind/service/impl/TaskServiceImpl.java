package com.todo.softwaremind.service.impl;

import com.todo.softwaremind.exception.TaskNotFoundException;
import com.todo.softwaremind.mapper.DetailsMapper;
import com.todo.softwaremind.mapper.TaskMapper;
import com.todo.softwaremind.model.dto.TaskDto;
import com.todo.softwaremind.repository.TaskRepository;
import com.todo.softwaremind.service.contract.TaskService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final DetailsMapper detailsMapper;

    public TaskDto createTask(TaskDto taskDto) {
        return taskMapper.mapTaskToDto(taskRepository.save(taskMapper.mapDtoToTask(taskDto)));
    }

    public Page<TaskDto> getTasks(String sortBy, String sortDirection, Integer page, Integer pageSize) {
        var pageRequest = createPageRequest(sortBy, sortDirection, page, pageSize);
        return taskMapper.mapTaskPageToTaskDtoPage(taskRepository.findAll(pageRequest));
    }

    @Override
    @Transactional
    public TaskDto updateTask(TaskDto taskDto, UUID id) {
        return taskRepository.findByPublicId(id)
                .map(task -> {
                    task.setTitle(taskDto.title());
                    task.setContent(taskDto.content());
                    task.setDetails(detailsMapper.mapDetailsDtoToDetails(taskDto.details()));
                    task.setDone(taskDto.isDone());
                    task.setPriority(taskDto.priority());
                    taskRepository.save(task);
                    return taskMapper.mapTaskToDto(task);
                })
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    public void deleteTask(UUID id) {
        taskRepository.findByPublicId(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        taskRepository.deleteByPublicId(id);
    }

    @Override
    public TaskDto getTask(UUID id) {
        return taskMapper.mapTaskToDto(
                taskRepository.findByPublicId(id)
                        .orElseThrow(() -> new TaskNotFoundException(id)));
    }

    private PageRequest createPageRequest(String sortBy, String sortDirection, Integer page, Integer pageSize) {
        var sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        return PageRequest.of(page, pageSize, sort);
    }
}
