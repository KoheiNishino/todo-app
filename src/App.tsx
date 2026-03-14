import { createContext, use, useReducer, useState, type ComponentProps, type FC } from "react";
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

const TodoContext = createContext<{
  title: Todo["title"];
  todos: Todo[];
  addTodo: () => void;
  checkTodo: (id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  handleTitleChange: ComponentProps<"input">["onChange"];
}>({
  title: "",
  todos: [],
  addTodo: () => {},
  checkTodo: () => {},
  deleteTodo: () => {},
  handleTitleChange: () => {},
});

const Todos: FC = () => {
  const { title, todos, addTodo, checkTodo, deleteTodo, handleTitleChange } = use(TodoContext);

  return (
    <div className={css({ display: "grid", gap: 8 })}>
      <div className={css({ display: "flex" })}>
        <input onChange={handleTitleChange} value={title} />
        <button
          onClick={() => {
            addTodo();
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
                checkTodo(todo.id);
              }}
            />
            <span>{todo.title}</span>
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [title, setTitle] = useState("");
  const [todos, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem("todos") ?? "[]"));

  return (
    <TodoContext
      value={{
        title,
        todos,
        addTodo: () => {
          dispatch({ type: "add", title });
          setTitle("");
        },
        checkTodo: (id) => dispatch({ type: "check", id }),
        deleteTodo: (id) => dispatch({ type: "delete", id }),
        handleTitleChange: (e) => setTitle(e.target.value),
      }}
    >
      <Todos />
    </TodoContext>
  );
}
