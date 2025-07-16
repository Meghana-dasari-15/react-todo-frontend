import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const API_URL = "https://fullstack-todo-list-app-4.onrender.com/items";

  // Load items from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  // Add new item
  const addItem = () => {
    if (newItem.trim() === "") return;

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
  const deleteItem = (index) => {
    fetch(`${API_URL}/${index}`, { method: "DELETE" })
      .then(() => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
      });
  };

  return (
    <div className="App">
      <h1>📝 Fullstack Todo App</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}{" "}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

