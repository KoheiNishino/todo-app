import { useState } from "react";
import { css } from "../styled-system/css";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const KEY = "todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
  const [title, setTitle] = useState("");

  return (
    <main className={css({ margin: "0 auto", width: "80%" })}>
      <div className={css({ display: "grid", gap: 8, gridTemplateColumns: "1fr auto" })}>
        <input onChange={(e) => setTitle(e.target.value)} value={title} />
        <button
          onClick={() => {
            setTodos((prev) => {
              const newTodos = [...prev, { id: crypto.randomUUID(), title, completed: false }];
              localStorage.setItem(KEY, JSON.stringify(newTodos));
              return newTodos;
            });
            setTitle("");
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo, i) => {
          return (
            <li className={css({ display: "grid", gap: 4, gridTemplateColumns: "auto 1fr auto" })}>
              <input
                checked={todo.completed}
                onChange={(e) => {
                  setTodos((prev) => {
                    const newTodos = prev.toSpliced(i, 1, {
                      ...todo,
                      completed: e.target.checked,
                    });
                    localStorage.setItem(KEY, JSON.stringify(newTodos));
                    return newTodos;
                  });
                }}
                type="checkbox"
              />
              <span>{todo.title}</span>
              <button
                onClick={() => {
                  setTodos((prev) => {
                    const newTodos = prev.toSpliced(i, 1);
                    localStorage.setItem(KEY, JSON.stringify(newTodos));
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
