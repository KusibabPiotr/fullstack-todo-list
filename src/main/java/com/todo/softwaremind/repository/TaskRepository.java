package com.todo.softwaremind.repository;

import com.todo.softwaremind.model.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
