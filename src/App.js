// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("https://fullstack-todo-list-app-4.onrender.com/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = () => {
    if (newItem.trim() === "") return;
    fetch("https://fullstack-todo-list-app-4.onrender.com/items", {
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

  const deleteItem = (index) => {
    fetch(`https://fullstack-todo-list-app-4.onrender.com/items/${index}`, {
      method: "DELETE",
    }).then(() => {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    });
  };

  return (
    <div className="App">
      <h1>📝 Fullstack Todo App</h1>
      <input
        type="text"
        placeholder="Enter item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            <button
              onClick={() => deleteItem(index)}
              style={{
                marginLeft: "10px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
