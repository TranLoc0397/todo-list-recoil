import React from "react";
import TodoList from "./components/TodoList";
import './App.css'

const App = () => {
  return (
    <div id="app">
      <div className="to-do-card">
      <TodoList />
      </div>
    </div>
  );
};
export default App;
