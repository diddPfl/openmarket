import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import CategoryItemList from './Category/CategoryItemList';
import MainPage from './Main';
import CategoryList from './Category/CategoryList';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categoryitems/category/:categoryId" element={<CategoryItemList />} />
          <Route path="/categoryitems/gubun/:gubunSubCode" element={<CategoryItemList />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;