import { useState } from "react";

type FormFields = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_ERROR = {
  name: "",
  email: "",
  message: "",
} as const satisfies Record<keyof FormFields, string>;

export default function App() {
  const [obj, setObj] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState(INITIAL_ERROR);

  return (
    <form
      css={{ display: "grid", gap: 16 }}
      onSubmit={(e) => {
        e.preventDefault();
        const emptyKeys = (Object.keys(obj) as (keyof FormFields)[]).filter((k) => obj[k] === "");

        if (emptyKeys.length > 0) {
          setError((prev) => ({
            ...prev,
            ...Object.fromEntries(emptyKeys.map((k) => [k, "必須項目です"])),
          }));
          return;
        }

        console.log(obj);
        setError(INITIAL_ERROR);
      }}
    >
      <div css={{ display: "grid", gap: 8 }}>
        <label htmlFor="name">name</label>
        <input
          id="name"
          onChange={(e) => setObj((prev) => ({ ...prev, name: e.target.value }))}
          value={obj.name}
          type="text"
        />
        {error.name !== "" ? <span css={{ color: "red" }}>{error.name}</span> : null}
      </div>
      <div css={{ display: "grid", gap: 8 }}>
        <label htmlFor="email">email</label>
        <input
          id="email"
          onChange={(e) => setObj((prev) => ({ ...prev, email: e.target.value }))}
          type="email"
          value={obj.email}
        />
        {error.email !== "" ? <span css={{ color: "red" }}>{error.email}</span> : null}
      </div>
      <div css={{ display: "grid", gap: 8 }}>
        <label htmlFor="message">message</label>
        <textarea
          id="message"
          onChange={(e) => setObj((prev) => ({ ...prev, message: e.target.value }))}
          value={obj.message}
        ></textarea>
        {error.message !== "" ? <span css={{ color: "red" }}>{error.message}</span> : null}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
