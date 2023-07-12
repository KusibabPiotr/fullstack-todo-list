package com.todo.softwaremind.model.domain;

import com.todo.softwaremind.model.Priority;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;
import java.util.UUID;

@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "TASKS")
public class Task {
    @Id
    @GeneratedValue
    private Long id;
    private UUID publicId;
    private String title;
    private String content;
    private boolean isDone;
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Details details;
    private Priority priority;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Task task = (Task) o;
        return getId() != null && Objects.equals(getId(), task.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
