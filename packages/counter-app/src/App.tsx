import { useState } from "react";

const MIN_COUNT = 0;
const MAX_COUNT = 10;

export default function App() {
  const [count, setCount] = useState(MIN_COUNT);

  return (
    <div css={{ display: "flex", gap: 8 }}>
      <span>{count}</span>
      <div css={{ display: "flex", gap: 4 }}>
        <button disabled={count === MAX_COUNT} onClick={() => setCount((prev) => prev + 1)}>
          Up
        </button>
        <button disabled={count === MIN_COUNT} onClick={() => setCount((prev) => prev - 1)}>
          Down
        </button>
        <button onClick={() => setCount(MIN_COUNT)}>Reset</button>
      </div>
    </div>
  );
}
