// ============================================================
// SERVICE INTERFACE — src/services/IApiService.ts
// ============================================================
// 📘 LEARN: This interface defines the CONTRACT for any class
// that wants to be an "ApiService". 
//
// Why is this useful for Dependency Injection?
// Instead of TodoRepository depending directly on ApiService,
// it depends on THIS interface. That means you could swap out
// ApiService for a MockApiService (for testing) without
// changing a single line in TodoRepository.
//
// `Promise<T>` means the function is async and will
// eventually return a value of type T.
// ============================================================

import { TodoResponse } from "../models/todoResponse";
import { TodoRequest } from "../models/todoRequest";

export interface IApiService {
    getAll(): Promise<TodoResponse[]>;
    getById(id: number): Promise<TodoResponse>;
    create(data: TodoRequest): Promise<TodoResponse>;
    toggleComplete(id: number, completed: boolean): Promise<TodoResponse>;
    delete(id: number): Promise<void>; 
}