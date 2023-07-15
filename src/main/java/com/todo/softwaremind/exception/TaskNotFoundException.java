package com.todo.softwaremind.exception;

import java.util.UUID;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(UUID id){
        super("Could not found user with id " + id);
    }
}
