import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
// import PostList from './components/TodoList';
import TodoList from "./components/TodoList";
import CreateData from "./components/CreateData";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CreateData />
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
