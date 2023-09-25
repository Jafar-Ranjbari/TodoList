// src/components/TodoList.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchTodos,
  filterTodos,
  updateTodo,
  deleteTodo,
} from "./../redux/todosSlice";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, filteredTodos, status, error } = useSelector(
    (state) => state.todos
  );

  console.log("first", todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    dispatch(filterTodos(e.target.value));
  };

  // const handleUpdateTodo = (todo) => {
  //   dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  // };

  // const handleDeleteTodo = (id) => {
  //   dispatch(deleteTodo(id));
  // };

  return (
    <Container>
      <input
        type="text"
        placeholder="Filter by title"
        onChange={handleFilterChange}
      />

      <Link to="/Add">Add</Link>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <List>
        {filteredTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              primary={todo.title}
              // style={{
              //   textDecoration: todo.completed ? "line-through" : "none",
              // }}
            />
            {/* <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => handleUpdateTodo(todo)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="Delete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
