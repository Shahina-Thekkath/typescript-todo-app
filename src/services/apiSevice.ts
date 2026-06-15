// ============================================================
// API SERVICE — src/services/ApiService.ts
// ============================================================
// 📘 LEARN: This class handles ALL communication with the
// external API. No other class talks to the API directly —
// they all go through this service.
//
// KEY CONCEPTS HERE:
// - `async/await` — instead of chaining .then().then(), we use
//   await which pauses execution until the Promise resolves.
// - `try/catch` — wraps async code to handle errors gracefully.
//   If the API is down or returns an error, we catch it here.
// - `implements IApiService` — TypeScript enforces that this
//   class has ALL the methods defined in the interface.
// ============================================================

import { IApiService } from "./IApiServices";
import { TodoResponse } from "../models/todoResponse";
import { TodoRequest } from "../models/todoRequest";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export class ApiService implements IApiService {
  // 📘 LEARN: `async` keyword makes this function return a Promise.
  // `await` pauses here until fetch() completes, then continues.

  async getAll(): Promise<TodoResponse[]> {
    try {
      const response = await fetch(`${BASE_URL}?_limit=20`); // limit to 20 for display

      // 📘 LEARN: Always check if the response was successful.
      // HTTP errors (404, 500) don't throw by default — we check manually.

      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }

      const data = (await response.json()) as TodoResponse[];
      return data;
    } catch (error) {
      // 📘 LEARN: Re-throwing lets the caller (Repository) decide
      // how to handle the error, rather than silently swallowing it.
      throw new Error(`ApiService.getAll failed: ${(error as Error).message}`);
    }
  }

  async getById(id: number): Promise<TodoResponse> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Todo with id ${id} not found`);
      }
      return (await response.json()) as TodoResponse;
    } catch (error) {
      throw new Error(`ApiService.getById failed: ${(error as Error).message}`);
    }
  }

  async create(data: TodoRequest): Promise<TodoResponse> {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userId: data.userId ?? 1 }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create todo: ${response.statusText}`);
      }

      return (await response.json()) as TodoResponse;
    } catch (error) {
      throw new Error(`ApiService.create failed: ${(error as Error).message}`);
    }
  }

  async toggleComplete(id: number, completed: boolean): Promise<TodoResponse> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.statusText}`);
      }

      return (await response.json()) as TodoResponse; // "Trust me TypeScript, I know that this value is of this type."
    } catch (error) {
      throw new Error(
        `ApiService.toggleComplete failed: ${(error as Error).message}`,
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`Filed to delete todo ${id}`);
      }
    } catch (error) {
      throw new Error(`ApiService.delete failed: ${(error as Error).message}`);
    }
  }
}
