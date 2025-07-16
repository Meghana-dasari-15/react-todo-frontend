import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [itemName, setItemName] = useState('');
  const [items, setItems] = useState([]);

  // ✅ Fetch items from backend
  useEffect(() => {
    fetch("https://fullstack-todo-list-app-4.onrender.com/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // ✅ Add item
  const addItem = () => {
    if (itemName.trim() === "") return;

    fetch("https://fullstack-todo-list-app-4.onrender.com/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: itemName })
    })
      .then(res => res.json())
      .then(data => {
        setItems([...items, data]);
        setItemName('');
      });
  };

  // ✅ Delete item
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
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter item"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            <button className="delete-btn" onClick={() => deleteItem(index)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
