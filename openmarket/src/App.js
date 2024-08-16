import React from "react";
// react-router-dom에서 필요한 컴포넌트들을 가져옵니다.
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// 아이템 목록을 보여주는 컴포넌트를 가져옵니다.
import ItemList from "./ItemList";
// 아이템 상세 정보를 보여주는 컴포넌트를 가져옵니다.
import ItemDetail from "./ItemDetail";
// 카테고리 목록을 보여주는 컴포넌트를 가져옵니다.
import CategoryList from "./Category/CategoryList"
import SubCategoryList from "./Category/SubCategoryList"
import ItemReviewSection from './ItemReviewSection';
import ReviewDetail from './ReviewDetail';


// App 컴포넌트: 애플리케이션의 메인 컴포넌트입니다.
function App() {
  return (
    // Router 컴포넌트로 전체 앱을 감싸 라우팅 기능을 제공합니다.
    <Router>
      <div className="App">
        {/* Routes 컴포넌트 내부에 각 경로에 대한 라우트를 정의합니다. */}
        <Routes>
          {/*
            루트 경로('/')에 대한 라우트입니다.
            사용자가 메인 페이지에 접속하면 ItemList 컴포넌트가 렌더링됩니다.
          */}
          <Route path="/" element={<ItemList />} />
          {/*
            '/item/:id' 경로에 대한 라우트입니다.
            :id는 동적 세그먼트로, 특정 아이템의 ID를 나타냅니다.
            이 경로로 접속하면 ItemDetail 컴포넌트가 렌더링되며,
            해당 ID의 아이템 상세 정보를 보여줍니다.
          */}
          <Route path="/category" element={<CategoryList />} />
          <Route path="/category/:id" element={<SubCategoryList />} />
          <Route path="/review/:reviewId" element={<ReviewDetail />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/review/detail/:reviewId" element={<ReviewDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

// App 컴포넌트를 내보내 다른 파일에서 사용할 수 있게 합니다.
export default App;