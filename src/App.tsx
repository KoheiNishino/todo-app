import { useState } from "react";
import { css } from "../styled-system/css";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
};

export default function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem("todos") ?? "[]"));

  return (
    <div className={css({ display: "grid", gap: 8 })}>
      <div className={css({ display: "flex" })}>
        <input onChange={(e) => setTitle(e.target.value)} value={title} />
        <button
          onClick={() => {
            setTodos((prev) => {
              const newTodos = [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  title,
                  isDone: false,
                },
              ];
              localStorage.setItem("todos", JSON.stringify(newTodos));
              return newTodos;
            });
            setTitle("");
          }}
        >
          Add
        </button>
      </div>
      <div className={css({ display: "grid", gap: 4 })}>
        {todos.map((todo) => (
          <div key={todo.id} className={css({ display: "flex", gap: 2 })}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={(e) => {
                setTodos((prev) => {
                  const newTodos = prev.toSpliced(prev.findIndex((t) => t.id === todo.id)!, 1, {
                    ...todo,
                    isDone: e.target.checked,
                  });
                  localStorage.setItem("todos", JSON.stringify(newTodos));
                  return newTodos;
                });
              }}
            />
            <span>{todo.title}</span>
            <button
              onClick={() => {
                setTodos((prev) => {
                  const newTodos = prev.filter((t) => t.id !== todo.id);
                  localStorage.setItem("todos", JSON.stringify(newTodos));
                  return newTodos;
                });
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
