import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const API_URL = "https://fullstack-todo-list-app-4.onrender.com/items";

  // Fetch all items from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Add new item
  const handleAdd = () => {
    if (!newItem.trim()) return;
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([...items, data]);
        setNewItem("");
      });
  };

  // Delete item by index
  const handleDelete = (index) => {
    fetch(`${API_URL}/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      });
  };

  return (
    <div className="app-container">
      <h1>📝 Fullstack Todo App</h1>

      <input
        type="text"
        placeholder="Enter item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      {items.map((item, index) => (
        <div key={index} className="todo-item">
          <span className="todo-text">{item.name}</span>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;



