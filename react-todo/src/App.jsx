// src/App.jsx
import React from "react";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>✅ React Todo App</h1>
      <TodoList />
    </div>
  );
}
