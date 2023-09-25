// src/components/TodoFilter.js
import React, { useState } from "react";
import { useSelector } from "react-redux";

const TodoFilter = () => {
  const todos = useSelector((state) => state.todos.todos);
  const [filter, setFilter] = useState("");

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter Todos"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoFilter;
