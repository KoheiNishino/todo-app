import { useEffect, useState } from "react";
import { css } from "../styled-system/css";

type Brand<T, B> = T & { __brand: B };
type Id = Brand<string, "id">;
type Title = Brand<string, "title">;

type Todo = {
  id: Id;
  title: Title;
  completed: boolean;
};

const KEY = "todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
  const [title, setTitle] = useState("");

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <main className={css({ margin: "0 auto", width: "80%" })}>
      <div className={css({ display: "grid", gap: 8, gridTemplateColumns: "1fr auto" })}>
        <input onChange={(e) => setTitle(e.target.value)} value={title} />
        <button
          onClick={() => {
            setTodos((prev) => {
              const newTodos = [
                ...prev,
                { id: crypto.randomUUID() as Id, title: title as Title, completed: false },
              ];
              return newTodos;
            });
            setTitle("");
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className={css({ display: "grid", gap: 4, gridTemplateColumns: "auto 1fr auto" })}
            >
              <input
                checked={todo.completed}
                onChange={(e) => {
                  setTodos((prev) => {
                    const newTodos = prev.map((t) => {
                      return t.id === todo.id ? { ...t, completed: e.target.checked } : t;
                    });
                    return newTodos;
                  });
                }}
                type="checkbox"
              />
              <span>{todo.title}</span>
              <button
                onClick={() => {
                  setTodos((prev) => {
                    const newTodos = prev.filter((t) => t.id !== todo.id);
                    return newTodos;
                  });
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
