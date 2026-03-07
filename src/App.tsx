import { useEffect, useReducer, useState } from "react";
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

type Action =
  | {
      type: "add";
      title: Title;
    }
  | {
      type: "checked";
      checked: boolean;
      id: Id;
    }
  | {
      type: "delete";
      id: Id;
    };

const reducer = (state: Todo[], action: Action) => {
  if (action.type === "add") {
    const newTodos = [
      ...state,
      { id: crypto.randomUUID() as Id, title: action.title, completed: false },
    ];
    return newTodos;
  }

  if (action.type === "checked") {
    const newTodos = state.map((t) => {
      return t.id === action.id ? { ...t, completed: action.checked } : t;
    });
    return newTodos;
  }

  if (action.type === "delete") {
    return state.filter((t) => t.id !== action.id);
  }
  throw Error("Unknown action.");
};

export default function App() {
  const [title, setTitle] = useState("");
  const [todos, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem(KEY) ?? "[]"));

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <main className={css({ margin: "0 auto", width: "80%" })}>
      <div className={css({ display: "grid", gap: 8, gridTemplateColumns: "1fr auto" })}>
        <input onChange={(e) => setTitle(e.target.value)} value={title} />
        <button
          onClick={() => {
            dispatch({ type: "add", title: title as Title });
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
                  dispatch({ type: "checked", checked: e.target.checked, id: todo.id });
                }}
                type="checkbox"
              />
              <span>{todo.title}</span>
              <button
                onClick={() => {
                  dispatch({ type: "delete", id: todo.id });
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
