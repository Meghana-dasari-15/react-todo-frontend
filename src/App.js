// src/App.js

import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  // 🔁 Load items from localStorage on start
  useEffect(() => {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // ➕ Add item to list (not auto-saved)
  const handleAdd = () => {
    if (input.trim() === "") return;
    setItems([...items, input]);
    setInput("");
  };

  // 💾 Save items to localStorage
  const handleSave = () => {
    localStorage.setItem("todoItems", JSON.stringify(items));
    alert("Saved!");
  };

  // ❌ Delete item and update localStorage
  const handleDelete = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
    localStorage.setItem("todoItems", JSON.stringify(updated)); // update storage
  };

  return (
    <div className="app-container">
      <h1>📝 Fullstack To-do App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleSave}>Save</button>
      </div>
      {items.map((item, index) => (
        <div className="todo-item" key={index}>
          <span className="todo-text">{item}</span>
          <button className="delete-btn" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;


