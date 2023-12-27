import React, { useState } from "react";

const items = [];

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  function setChange(event) {
    const { value } = event.target;
    setItem(value);
  }

  function addElement() {
    setItems((prev) => {
      return [...prev, item];
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={setChange} value={item} />
        <button onClick={addElement}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((itr) => (
            <li>{itr}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
