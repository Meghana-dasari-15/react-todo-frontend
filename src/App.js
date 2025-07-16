import React, { useState } from "react";

function App() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  // ✅ Add new item (only in current session)
  const handleAdd = () => {
    if (itemText.trim() === "") return;

    // Add directly to frontend, skip backend
    setItems([...items, { name: itemText }]);
    setItemText("");
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
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





