import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import CategoryItemList from './Category/CategoryItemList';
import MainPage from './Main';
import CategoryList from './Category/CategoryList';
import NoticeList from './Notice/NoticeList';
import NoticeView from './Notice/NoticeView';
import NoticeForm from './Notice/NoticeForm';
import Admin from './Admin/Admin';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Admin />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categoryitems/category/:categoryId" element={<CategoryItemList />} />
          <Route path="/categoryitems/gubun/:gubunSubCode" element={<CategoryItemList />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/notices" element={<NoticeList />} />
          <Route path="/notices/:noticeNo" element={<NoticeView />} />
          <Route path="/notices/new" element={<NoticeForm />} />
          <Route path="/notices/:noticeNo/edit" element={<NoticeForm />} />
          <Route path="/notices/:noticeNo/edit" element={<NoticeForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;