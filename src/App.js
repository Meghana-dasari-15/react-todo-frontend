import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // ✅ Add sound effects here
  const addSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
  const deleteSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");

  // ✅ Fetch items from backend
  const fetchItems = async () => {
    const response = await fetch("https://fullstack-todo-list-app-4.onrender.com/items");
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Add new item with sound
  const handleAdd = async () => {
    if (newItem.trim() !== "") {
      addSound.play(); // Play sound
      await fetch("https://fullstack-todo-list-app-4.onrender.com/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newItem }),
      });
      setNewItem("");
      fetchItems();
    }
  };

  // ✅ Delete item with sound
  const handleDelete = async (index) => {
    deleteSound.play(); // Play sound
    await fetch(`https://fullstack-todo-list-app-4.onrender.com/items/${index}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  return (
    <div className="app-container">
      <h1>📝 Fullstack To-do App</h1>
      <input
        type="text"
        placeholder="Enter item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
