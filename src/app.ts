// ============================================================
// APP ENTRY POINT — src/app.ts
// ============================================================
// 📘 LEARN: This is where everything gets wired together.
// We BUILD the dependency chain here manually:
//   ApiService → TodoRepository → TodoManager → Routes
// Each one receives the class below it injected in.
// This is called the "Composition Root" — one place where
// all dependencies are assembled.
// ============================================================

import express, { Express } from "express";
import path from "path";
import { ApiService } from "./services/apiService";
import { TodoRepository } from "./repositories/todoRepository";
import { TodoManager } from "./managers/todoManager";
import { todoRoutes } from "./routes/todoRoutes";
import { log } from "console";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true})); // parse form submissions
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ── DEPENDENCY INJECTION (Composition Root) ──────────────────
// 📘 LEARN: We build the chain from the bottom up.
// Each class receives the one it depends on.

const apiService = new ApiService();
const todoRepo = new TodoRepository(apiService);
const todoManager = new TodoManager(todoRepo);

app.use("/", todoRoutes(todoManager));  // inject todoManager

app.listen(PORT, () => {
    console.log(`\n Todo App running at http://localhost:${PORT}`); 
});