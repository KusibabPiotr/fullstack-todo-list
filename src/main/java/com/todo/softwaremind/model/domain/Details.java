package com.todo.softwaremind.model.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "DETAILS")
public class Details {
    @Id
    @GeneratedValue
    private Long id;
    private UUID publicId;
    private LocalDateTime created;
    private LocalDateTime deadLine;
    private String reportTo;
    private String uplineEmail;
    private String uplineMobile;

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
