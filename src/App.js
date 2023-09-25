import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddtoList from "./components/AddtoList";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <h1>Todo App challenge قلمچی </h1> */}
          <Route path="/" element={<TodoList />} />
          <Route path="/Add/*" element={<AddtoList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
