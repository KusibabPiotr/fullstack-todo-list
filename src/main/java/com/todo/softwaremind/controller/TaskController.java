package com.todo.softwaremind.controller;

import com.todo.softwaremind.model.TaskDto;
import com.todo.softwaremind.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(TaskDto taskDto) {
        return ResponseEntity.ok(taskService.createTask(taskDto));
    }
}
