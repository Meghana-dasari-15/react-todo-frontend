import React, { useEffect, useState } from "react";

function App() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  // ✅ Load items on page load
  useEffect(() => {
    fetch("https://fullstack-todo-list-app-4.onrender.com/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // ✅ Add new item
  const handleAdd = () => {
    if (itemText.trim() === "") return;
    fetch("https://fullstack-todo-list-app-4.onrender.com/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: itemText }),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setItems([...items, newItem]);
        setItemText("");
      });
  };

  // ✅ Delete item
  const handleDelete = (index) => {
    fetch(`https://fullstack-todo-list-app-4.onrender.com/items/${index}`, {
      method: "DELETE",
    }).then(() => {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    });
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial", textAlign: "center" }}>
      <h1>📝 Fullstack Todo App</h1>
      <input
        value={itemText}
        onChange={(e) => setItemText(e.target.value)}
        placeholder="Enter item"
        style={{ padding: "8px", width: "60%" }}
      />
      <button
        onClick={handleAdd}
        style={{ padding: "8px 16px", marginLeft: 10 }}
      >
        Add
      </button>

      <ul style={{ listStyleType: "none", padding: 0, marginTop: 20 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: 10 }}>
            <span style={{ marginRight: 10 }}>{item.name}</span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



