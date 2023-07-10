package com.todo.softwaremind.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.Objects;

@Builder
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "DETAILS")
public class Details {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDateTime created;
    private LocalDateTime timeline;
    private Priority priority;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Details details = (Details) o;
        return getId() != null && Objects.equals(getId(), details.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
