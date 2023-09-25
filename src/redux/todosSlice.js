// src/features/todos/todosSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an initial state for the todos
const initialState = {
  todos: [],
  status: "idle",
  error: null,
  filteredTodos: [],
};

// Define an async thunk to fetch todos from the API
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(
    // "https://jsonplaceholder.typicode.com/todos"
    "http://46.100.46.149:8069/api/tasks"
  );
  // const response = await axios.get("http://178.252.143.198:8069/api/tasks");

  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    newTodo
  );
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    return todoId;
  }
);
// Create a todos slice
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Define a reducer to filter todos based on a keyword
    filterTodos: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.filteredTodos = state.todos.filter((todo) =>
        todo.title.toLowerCase().includes(keyword)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
        state.filteredTodos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedIndex = state.list.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.list[updatedIndex] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      });
  },
});

// Export the actions and reducer
export const { filterTodos } = todosSlice.actions;
export default todosSlice.reducer;
