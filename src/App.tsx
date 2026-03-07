import { useState } from "react";
import { css } from "../styled-system/css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      {count}
      <button className={css({ color: "cyan" })} onClick={() => setCount((prev) => prev + 1)}>
        Button
      </button>
    </div>
  );
}
