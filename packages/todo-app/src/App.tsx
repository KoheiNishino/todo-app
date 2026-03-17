import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ComponentProps,
  type FC,
} from "react";

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
    return newTodos;
  } else if (action.type === "delete") {
    const newTodos = state.filter((t) => t.id !== action.id);
    return newTodos;
  } else if (action.type === "check") {
    const newTodos = state.map((t) => (t.id === action.id ? { ...t, isDone: !t.isDone } : t));
    return newTodos;
  } else {
    throw new Error("No action type is found");
  }
};

type TodoContextValue = {
  title: Todo["title"];
  todos: Todo[];
  addTodo: () => void;
  checkTodo: (id: Todo["id"]) => void;
  deleteTodo: (id: Todo["id"]) => void;
  handleTitleChange: ComponentProps<"input">["onChange"];
};

const TodoContext = createContext<TodoContextValue>({
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
    <div css={{ display: "grid", gap: 16 }}>
      <div css={{ display: "flex", gap: 8 }}>
        <input onChange={handleTitleChange} value={title} />
        <button onClick={addTodo}>Add</button>
      </div>
      <div css={{ display: "grid", gap: 8 }}>
        {todos.map((todo) => (
          <div key={todo.id} css={{ display: "flex", gap: 4 }}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => {
                checkTodo(todo.id);
              }}
            />
            <span>{todo.title}</span>
            <button
              css={{ color: "white", background: "red", borderColor: "red", borderRadius: 8 }}
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

  const setTodosToLocalStorage = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setTodosToLocalStorage();
  }, [setTodosToLocalStorage, todos]);

  const value = useMemo(() => {
    return {
      title,
      todos,
      addTodo: () => {
        dispatch({ type: "add", title });
        setTitle("");
      },
      checkTodo: (id) => dispatch({ type: "check", id }),
      deleteTodo: (id) => dispatch({ type: "delete", id }),
      handleTitleChange: (e) => setTitle(e.target.value),
    } satisfies TodoContextValue;
  }, [title, todos]);

  return (
    <TodoContext value={value}>
      <Todos />
    </TodoContext>
  );
}
