import React from "react";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";
<<<<<<< HEAD
// 카테고리 목록을 보여주는 컴포넌트를 가져옵니다.
import ItemReviewSection from './ItemReviewSection';
import ReviewDetail from './ReviewDetail';
import ItemInsert from './ItemInsert';

import CategoryItemList from './Category/CategoryItemList';
import MainPage from './Category/Main';
import CategoryList from './Category/CategoryList';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Routes 컴포넌트 내부에 각 경로에 대한 라우트를 정의합니다. */}
        <Routes>
          {/*
            루트 경로('/')에 대한 라우트입니다.
            사용자가 메인 페이지에 접속하면 ItemList 컴포넌트가 렌더링됩니다.
          */}
          <Route path="/insertItem" element={<ItemInsert />} />
          {/*
            '/item/:id' 경로에 대한 라우트입니다.
            :id는 동적 세그먼트로, 특정 아이템의 ID를 나타냅니다.
            이 경로로 접속하면 ItemDetail 컴포넌트가 렌더링되며,
            해당 ID의 아이템 상세 정보를 보여줍니다.
          */}
          <Route path="/review/:reviewId" element={<ReviewDetail />} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categoryitems/category/:categoryId" element={<CategoryItemList />} />
          <Route path="/categoryitems/gubun/:gubunSubCode" element={<CategoryItemList />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/review/detail/:reviewId" element={<ReviewDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;