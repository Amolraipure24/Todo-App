import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    await axios.post("/todos", { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
    fetchTodos();
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo._id);
    setEditText(todo.title);
  };

  const updateTodo = async () => {
    if (editText.trim() === "") return;
    await axios.put(`/todos/${editTodo}`, { title: editText });
    setEditTodo(null);
    setEditText("");
    fetchTodos();
  };

  const cancelEdit = () => {
    setEditTodo(null);
    setEditText("");
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center p-4 border rounded-md shadow-sm"
          >
            {editTodo === todo._id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-green-300"
                />
                <button
                  onClick={updateTodo}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1">{todo.title}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
