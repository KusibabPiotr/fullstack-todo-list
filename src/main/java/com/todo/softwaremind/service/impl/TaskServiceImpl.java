package com.todo.softwaremind.service.impl;

import com.todo.softwaremind.exception.TaskNotFoundException;
import com.todo.softwaremind.mapper.DetailsMapper;
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

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final DetailsMapper detailsMapper;

    public TaskDto createTask(TaskDto taskDto) {
        Task save = taskRepository.save(taskMapper.mapDtoToTask(taskDto));
        return taskMapper.mapTaskToDto(save);
    }

    public Page<TaskDto> getTasks(String sortBy, String sortDirection, Integer page, Integer pageSize) {
        PageRequest pageRequest = createPageRequest(sortBy, sortDirection, page, pageSize);
        return taskMapper.mapTaskPageToTaskDtoPage(taskRepository.findAll(pageRequest));
    }

    @Override
    public TaskDto updateTask(TaskDto taskDto, UUID id) {
        Task taskFromDb = taskRepository.findByPublicId(id)
                .orElseThrow(TaskNotFoundException::new);
        taskFromDb.setTitle(taskDto.title());
        taskFromDb.setContent(taskDto.content());
        taskFromDb.setDetails(detailsMapper.mapDetailsDtoToDetails(taskDto.details()));
        return taskDto;
    }

    @Override
    public void deleteTask(UUID id) {
        taskRepository.findByPublicId(id)
                .orElseThrow(TaskNotFoundException::new);
        taskRepository.deleteByPublicId(id);
    }

    @Override
    public TaskDto getTask(UUID id) {
        return taskMapper.mapTaskToDto(
                taskRepository.findByPublicId(id)
                        .orElseThrow(TaskNotFoundException::new));
    }

    private PageRequest createPageRequest(String sortBy, String sortDirection, Integer page, Integer pageSize) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        return PageRequest.of(page, pageSize, sort);
    }
}
