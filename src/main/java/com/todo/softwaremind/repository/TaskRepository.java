package com.todo.softwaremind.repository;

import com.todo.softwaremind.model.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findByPublicId(UUID publicId);
    void deleteByPublicId(UUID id);

}
