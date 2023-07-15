package com.todo.softwaremind.service.impl;

import com.todo.softwaremind.mapper.DetailsMapper;
import com.todo.softwaremind.mapper.TaskMapper;
import com.todo.softwaremind.model.Priority;
import com.todo.softwaremind.model.domain.Details;
import com.todo.softwaremind.model.domain.Task;
import com.todo.softwaremind.model.dto.DetailsDto;
import com.todo.softwaremind.model.dto.TaskDto;
import com.todo.softwaremind.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;
import com.todo.softwaremind.exception.TaskNotFoundException;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {
    @Mock
    private TaskRepository taskRepository;
    @Mock
    private TaskMapper taskMapper;
    @Mock
    private DetailsMapper detailsMapper;
    @InjectMocks
    private TaskServiceImpl taskService;
    private TaskDto taskDto;
    private TaskDto expectedTaskDto;
    private Task task;
    private UUID id;

    @BeforeEach
    void setUp() {
        taskDto = TaskDto.builder()
                .publicId(UUID.fromString("07f3a8b2-6d1a-481d-a3c3-81a87624c321"))
                .title("title")
                .content("content")
                .isDone(false)
                .priority(Priority.MEDIUM)
                .details(DetailsDto.builder()
                        .created(LocalDateTime.of(2023,7,15,12,0,0))
                        .deadLine(LocalDateTime.of(2023,8,15,12,0,0))
                        .uplineMobile("123123123")
                        .uplineEmail("email@email.com")
                        .reportTo("Adam Sandler")
                        .publicId(UUID.fromString("07f3a8b2-6d1a-481d-a3c3-81a87624c322"))
                        .build())
                .build();
        expectedTaskDto = TaskDto.builder()
                .publicId(UUID.fromString("07f3a8b2-6d1a-481d-a3c3-81a87624c321"))
                .title("title")
                .content("content")
                .isDone(false)
                .priority(Priority.MEDIUM)
                .details(DetailsDto.builder()
                        .created(LocalDateTime.of(2023,7,15,12,0,0))
                        .deadLine(LocalDateTime.of(2023,8,15,12,0,0))
                        .uplineMobile("123123123")
                        .uplineEmail("email@email.com")
                        .reportTo("Adam Sandler")
                        .publicId(UUID.fromString("07f3a8b2-6d1a-481d-a3c3-81a87624c322"))
                        .build())
                .build();
        task = Task.builder()
                .publicId(UUID.fromString("07f3a8b2-6d1a-481d-a3c3-81a87624c321"))
                .title("title")
                .content("content")
                .isDone(false)
                .priority(Priority.MEDIUM)
                .details(Details.builder()
                        .created(LocalDateTime.of(2023,7,15,12,0,0))
                        .deadLine(LocalDateTime.of(2023,8,15,12,0,0))
                        .uplineMobile("123123123")
                        .uplineEmail("email@email.com")
                        .reportTo("Adam Sandler")
                        .publicId(UUID.fromString("07f3a8b2-6d1a-481d-a3c3-81a87624c322"))
                        .build())
                .build();
        id = UUID.fromString("07f3a8b2-6d1a-481d-a3c3-81a87624c321");
    }

    @Test
    void createTaskShouldReturnCreatedTaskDto() {
        // Arrange
        when(taskMapper.mapDtoToTask(taskDto)).thenReturn(task);
        when(taskRepository.save(task)).thenReturn(task);
        when(taskMapper.mapTaskToDto(task)).thenReturn(taskDto);

        // Act
        TaskDto result = taskService.createTask(taskDto);

        // Assert
        assertThat(result).isEqualTo(expectedTaskDto);
        verify(taskMapper).mapDtoToTask(taskDto);
        verify(taskRepository).save(task);
        verify(taskMapper).mapTaskToDto(task);
    }

    @Test
    void getTasksShouldReturnTaskDtoPage() {
        // Arrange
        String sortBy = "title";
        String sortDirection = "asc";
        int page = 0;
        int pageSize = 10;
        List<Task> tasks = new ArrayList<>();
        tasks.add(task);
        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.by(Sort.Direction.fromString(sortDirection), sortBy));
        Page<Task> taskPage = new PageImpl<>(tasks, pageRequest, tasks.size());
        List<TaskDto> taskDtos = new ArrayList<>();
        taskDtos.add(taskDto);
        Page<TaskDto> taskDtoPage = new PageImpl<>(taskDtos, pageRequest, tasks.size());

        when(taskRepository.findAll(pageRequest)).thenReturn(taskPage);
        when(taskMapper.mapTaskPageToTaskDtoPage(taskPage)).thenReturn(taskDtoPage);

        // Act
        Page<TaskDto> result = taskService.getTasks(sortBy, sortDirection, page, pageSize);

        // Assert
        assertThat(result).containsExactlyElementsOf(taskDtoPage);
        verify(taskRepository).findAll(pageRequest);
        verify(taskMapper).mapTaskPageToTaskDtoPage(taskPage);
    }

    @Test
    void updateTaskExistingTaskShouldReturnUpdatedTaskDto() {
        // Arrange
        when(taskRepository.findByPublicId(id))
                .thenReturn(Optional.of(task));
        when(taskMapper.mapTaskToDto(task)).thenReturn(taskDto);

        // Act
        TaskDto result = taskService.updateTask(taskDto, id);

        // Assert
        assertThat(result).isEqualTo(expectedTaskDto);
        verify(taskRepository).findByPublicId(id);
        verify(taskMapper).mapTaskToDto(task);
    }

    @Test
    void updateTaskNonExistingTaskShouldThrowException() {
        // Arrange
        UUID id = UUID.randomUUID();
        when(taskRepository.findByPublicId(id)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> taskService.updateTask(taskDto, id))
                .isInstanceOf(TaskNotFoundException.class);
        verify(taskRepository).findByPublicId(id);
        verifyNoMoreInteractions(taskMapper);
    }

    @Test
    void deleteTaskExistingTaskShouldDeleteTask() {
        // Arrange
        UUID id = UUID.randomUUID();
        when(taskRepository.findByPublicId(id)).thenReturn(Optional.of(task));

        // Act
        taskService.deleteTask(id);

        // Assert
        verify(taskRepository).findByPublicId(id);
        verify(taskRepository).deleteByPublicId(id);
    }

    @Test
    void deleteTaskNonExistingTaskShouldThrowException() {
        // Arrange
        UUID is = UUID.randomUUID();
        when(taskRepository.findByPublicId(is)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> taskService.deleteTask(is))
                .isInstanceOf(TaskNotFoundException.class);
        verify(taskRepository).findByPublicId(is);
        verifyNoMoreInteractions(taskRepository);
    }

    @Test
    void getTaskExistingTaskShouldReturnTaskDto() {
        // Arrange
        when(taskRepository.findByPublicId(id)).thenReturn(Optional.of(task));
        when(taskMapper.mapTaskToDto(task)).thenReturn(taskDto);

        // Act
        TaskDto result = taskService.getTask(id);

        // Assert
        assertThat(result).isEqualTo(taskDto);
        verify(taskRepository).findByPublicId(id);
        verify(taskMapper).mapTaskToDto(task);
    }

    @Test
    void getTaskNonExistingTaskShouldThrowException() {
        // Arrange
        UUID id = UUID.randomUUID();
        when(taskRepository.findByPublicId(id)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> taskService.getTask(id))
                .isInstanceOf(TaskNotFoundException.class);
        verify(taskRepository).findByPublicId(id);
        verifyNoMoreInteractions(taskMapper);
    }
}
