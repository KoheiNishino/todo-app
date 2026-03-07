import { useState } from "react";
import { css } from "../styled-system/css";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  return (
    <main className={css({ margin: "0 auto", width: "80%" })}>
      <div className={css({ display: "grid", gap: 8, gridTemplateColumns: "1fr auto" })}>
        <input onChange={(e) => setTitle(e.target.value)} value={title} />
        <button
          onClick={() => {
            setTodos((prev) => {
              return [...prev, { id: crypto.randomUUID(), title, completed: false }];
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
                    return prev.toSpliced(i, 1, {
                      ...todo,
                      completed: e.target.checked,
                    });
                  });
                }}
                type="checkbox"
              />
              <span>{todo.title}</span>
              <button
                onClick={() => {
                  setTodos((prev) => {
                    return prev.toSpliced(i, 1);
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
