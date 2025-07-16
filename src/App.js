import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // Fetch items from backend on load
  useEffect(() => {
    fetch("http://127.0.0.1:8000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Add item to backend
  const addItem = () => {
    if (!input.trim()) return; // avoid empty input
    fetch("http://127.0.0.1:8000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    }).then(() => {
      setItems([...items, { name: input }]);
      setInput("");
    });
  };

  // Delete item from backend
  const deleteItem = (index) => {
    fetch(`http://127.0.0.1:8000/items/${index}`, {
      method: "DELETE",
    }).then(() => {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    });
  };

  return (
    <div className="container">
      <h1>📝 Fullstack Todo App</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}
            <button
              onClick={() => deleteItem(index)}
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px' }}
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

