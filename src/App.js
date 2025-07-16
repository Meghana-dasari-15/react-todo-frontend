import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("https://fullstack-todo-list-app-4.onrender.com/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const addItem = () => {
    if (!newItem.trim()) return;

    fetch("https://fullstack-todo-list-app-4.onrender.com/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }), // ✅ Must match backend model
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([...items, data]);
        setNewItem("");
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const deleteItem = (index) => {
    fetch(`https://fullstack-todo-list-app-4.onrender.com/items/${index}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={() => deleteItem(index)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
