import { useReducer } from "react";

const MIN_COUNT = 0;
const MAX_COUNT = 10;

type Action =
  | {
      type: "up";
    }
  | {
      type: "down";
    }
  | {
      type: "reset";
    };

const reducer = (count: number, action: Action) => {
  if (action.type === "up") {
    return Math.min(count + 1, MAX_COUNT);
  } else if (action.type === "down") {
    return Math.max(count - 1, MIN_COUNT);
  } else if (action.type === "reset") {
    return MIN_COUNT;
  } else {
    throw new Error("No action type is found.");
  }
};

export default function App() {
  const [count, dispatch] = useReducer(reducer, MIN_COUNT);

  return (
    <div css={{ display: "flex", gap: 8 }}>
      <span>{count}</span>
      <div css={{ display: "flex", gap: 4 }}>
        <button disabled={count === MAX_COUNT} onClick={() => dispatch({ type: "up" })}>
          Up
        </button>
        <button disabled={count === MIN_COUNT} onClick={() => dispatch({ type: "down" })}>
          Down
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
