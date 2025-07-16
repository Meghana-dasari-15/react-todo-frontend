import React, { useState, useEffect } from "react";

function App() {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);

  // ✅ Fetch items on page load
  useEffect(() => {
    fetch("https://fullstack-todo-list-app-4.onrender.com/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // ✅ Add item
  const addItem = () => {
    if (itemName.trim() === "") return;

    fetch("https://fullstack-todo-list-app-4.onrender.com/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([...items, data]);
        setItemName(""); // clear input
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
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📝 Fullstack Todo App</h1>
      <input
        type="text"
        value={itemName}
        placeholder="Enter item"
        onChange={(e) => setItemName(e.target.value)}
      />
      <button onClick={addItem}>Add</button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            {item.name}{" "}
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
