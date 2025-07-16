import React, { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    if (item.trim() === "") return;

    // ✅ Add new item to local state (not backend)
    setItems([...items, item]);
    setItem("");

    // Optional: Play sound
    new Audio("/add.mp3").play();
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);

    // Optional: Play sound
    new Audio("/delete.mp3").play();
  };

  return (
    <div className="app-container">
      <h1>📝 Fullstack Todo App</h1>
      <input
        type="text"
        placeholder="Enter item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {items.map((itm, idx) => (
          <li key={idx}>
            {itm}
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


