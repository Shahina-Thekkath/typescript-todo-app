// ============================================================
// REPOSITORY — src/repositories/TodoRepository.ts
// ============================================================
// 📘 LEARN: The Repository pattern sits between your business
// logic and your data source (the API). It provides clean
// methods like getTodos() and getTodoById() so the Manager
// doesn't need to know HOW data is fetched — just that it is.
//
// DEPENDENCY INJECTION in action:
// Notice the constructor receives `IApiService` — NOT `ApiService`.
// This means you could pass in ANY class that implements IApiService.
// The Repository doesn't care about the implementation details.
// This makes testing easy and classes loosely coupled.
// ============================================================

import { IApiService } from "../services/IApiServices";
import { TodoRequest } from "../models/todoRequest";
import { TodoResponse } from "../models/todoResponse";

export class TodoRepository {
  // 📘 LEARN: DEPENDENCY INJECTION
  // `private apiService: IApiService` — the dependency is INJECTED
  // through the constructor instead of being created inside.
  // Compare the wrong way:  this.apiService = new ApiService() ← tightly coupled
  // The right way (below): receive it from outside ← loosely coupled

  constructor(private apiService: IApiService) {}

  async getTodos(): Promise<TodoResponse[]> {
    return await this.apiService.getAll();
  }

  async getTodoById(id: number): Promise<TodoResponse> {
    return await this.apiService.getById(id);
  }

  async createTodo(data: TodoRequest): Promise<TodoResponse> {
    return await this.apiService.create(data);
  }

  async toggleTodo(id: number, completed: boolean): Promise<TodoResponse> {
    return await this.apiService.toggleComplete(id, completed);
  }

  async deleteTodo(id: number): Promise<void> {
    return await this.apiService.delete(id);
  }
}
