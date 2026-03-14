import { useReducer, useState } from "react";
import { css } from "../styled-system/css";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
};

type Action =
  | {
      type: "add";
      title: Todo["title"];
    }
  | {
      type: "check";
      id: Todo["id"];
    }
  | {
      type: "delete";
      id: Todo["id"];
    };

const reducer = (state: Todo[], action: Action) => {
  if (action.type === "add") {
    const newTodos = [
      ...state,
      {
        id: crypto.randomUUID(),
        title: action.title,
        isDone: false,
      },
    ];
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;
  } else if (action.type === "delete") {
    const newTodos = state.filter((t) => t.id !== action.id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;
  } else if (action.type === "check") {
    const i = state.findIndex((t) => t.id === action.id)!;
    const newTodos = state.toSpliced(i, 1, {
      ...state[i],
      isDone: !state[i].isDone,
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    return newTodos;
  } else {
    throw new Error("No action type is found");
  }
};

export default function App() {
  const [title, setTitle] = useState("");
  const [todos, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("todos") ?? "[]"));

  return (
    <div className={css({ display: "grid", gap: 8 })}>
      <div className={css({ display: "flex" })}>
        <input onChange={(e) => setTitle(e.target.value)} value={title} />
        <button
          onClick={() => {
            dispatch({ type: "add", title });
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
              onChange={() => {
                dispatch({ type: "check", id: todo.id });
              }}
            />
            <span>{todo.title}</span>
            <button
              onClick={() => {
                dispatch({ type: "delete", id: todo.id });
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
