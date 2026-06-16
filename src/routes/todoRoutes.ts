// ============================================================
// ROUTES — src/routes/todoRoutes.ts
// ============================================================
// 📘 LEARN: Routes connect HTTP requests to your business logic.
// When a browser visits /todos, Express calls the right function
// here, which calls TodoManager, gets data, and renders an EJS view.
//
// res.render('index', { todos }) → sends data into the EJS template
// ============================================================

import { Router, Request, Response } from "express";
import { TodoManager } from '../managers/todoManager';

export function todoRoutes(todoManager: TodoManager): Router {
    const router = Router();

    router.get("/", async (req: Request, res: Response) => {
        try {
            const filter = req.query.filter as string || 'all';
            let todos;

            if(filter === "completed") {
                todos = await todoManager.getCompletedTodos();
            } else if(filter === "pending") {
                todos = await todoManager.getPendingTodos();
            } else {
                todos = await todoManager.getAllTodos();
            }

            const allTodos = await todoManager.getAllTodos();
            const completedCount = allTodos.filter(t => t.completed).length;
            const pendingCount = allTodos.filter(t => !t.completed).length;

            res.render("index", {
                todos,
                filter,
                totalCount: allTodos.length,
                completedCount,
                pendingCount,
                error: null
            });
        } catch (error) {
            res.render("detail", { todo: null, error: (error as Error).message });
        }
    });

    router.post("/add", async (req: Request, res: Response) => {
        try {
           const { title } = req.body;
           await todoManager.addTodo(title);
           res.redirect("/"); 
        } catch (error) {                                                             // eg: encodeURIComponent("Email already exists & invalid") becomes: Email%20already%20exists%20%26%20invalid
            res.redirect("/?error=" + encodeURIComponent((error as Error).message));  //This makes the text safe to place inside a URL.
        }
    });

    router.get("/toggle/:id", async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id as string);
            const completed = req.body.completed === "true";
            await todoManager.toggleTodo(id, !completed);
            res.redirect("/");
        } catch (error) {
            res.redirect("/");
        }
    });

    router.post("/delete/:id", async (req:Request, res: Response) => {
        try {
            const id = parseInt(req.params.id as string);
            await todoManager.deleteTodo(id);
            res.redirect("/")
        } catch (error) {
            res.redirect("/");
        }
    });

    return router;
}