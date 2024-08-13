import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemList from "./ItemList";
import ItemDetail from "./ItemDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Item Management</h1>
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;