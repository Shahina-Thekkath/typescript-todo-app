// ============================================================
// MANAGER — src/managers/TodoManager.ts
// ============================================================
// 📘 LEARN: The Manager (also called Service layer) contains
// BUSINESS LOGIC. It decides what to do with data before
// sending it to the view. It depends on TodoRepository,
// which is also injected through the constructor.
//
// DEPENDENCY CHAIN:
// TodoManager → TodoRepository → ApiService → External API
// Each layer only knows about the one directly below it.
// ============================================================

import { TodoRepository } from "../repositories/todoRepository";
import { TodoRequest } from "../models/todoRequest";
import { TodoResponse } from "../models/todoResponse";

export class TodoManager {
     // 📘 LEARN: Again, dependency injected via constructor.
     // Routes will create a TodoManager and pass in a TodoRepository.

     constructor(private todoRepository: TodoRepository) {}

     async getAllTodos(): Promise<TodoResponse[]> {
        const todos = await this.todoRepository.getTodos();
         // Business logic: sort so incomplete todos appear first

         return todos.sort((a, b) => Number(a.completed) - Number(b.completed));
     }

     async getTodoById(id: number): Promise<TodoResponse> {
        return await this.todoRepository.getTodoById(id);
     }

     async addTodo(title: string): Promise<TodoResponse> {
        if(!title || title.trim().length === 0) {
            throw new Error("Todo title cannot be empty");
        }
        const request: TodoRequest = { title: title.trim(), completed: false };
        return await this.todoRepository.createTodo(request)
     }

     async toggleTodo(id: number, completed: boolean): Promise<TodoResponse> {
        return await this.todoRepository.toggleTodo(id, completed);
     }
     
     async deleteTodo(id: number): Promise<void> {
        return await this.todoRepository.deleteTodo(id);
     }

     async getCompletedTodos(): Promise<TodoResponse[]> {
        const todos = await this.todoRepository.getTodos();
        return todos.filter(t => t.completed);
     }

     async getPendingTodos(): Promise<TodoResponse[]> {
        const todos = await this.todoRepository.getTodos();
        return todos.filter(t => !t.completed);
     }

}

