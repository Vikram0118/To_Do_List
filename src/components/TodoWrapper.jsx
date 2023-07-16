import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('ToDoList')) || 
                                    [
                                      {id :1, task :'Daily problem solving - DS', time: new Date(2022, 6, 16, 10, 30).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }), completed : false, isEditing : false}, 
                                      {id :2, task :'College Project Review', time: new Date(2022, 6, 16, 12, 30).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }), completed : false, isEditing : false}, 
                                      {id :3, task :'CN Online class', time: new Date(2022, 6, 16, 2, 30).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }), completed : false, isEditing : false}, 
                                    ]);

  useEffect (() => {
    localStorage.setItem('ToDoList', JSON.stringify(todos));
  },[todos])

  const addTodo = (todo) => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, time: formattedDate, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    const currentDate = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, time:formattedDate, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};