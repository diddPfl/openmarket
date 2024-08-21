import React from "react";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import CategoryItemList from './Category/CategoryItemList';
import MainPage from './Category/Main';
import CategoryList from './Category/CategoryList';

//login
import LoginComponent from './Components/LoginComponent';
import LogoutComponent from './Components/LogoutComponent';
import CreateMemberComponent from './Components/CreateMemberComponent'; // Import the CreateMemberComponent
// import MyPageComponent from './components/MyPageComponent';  // Commented out
// import AdminBoardComponent from './components/AdminBoardComponent';  // Commented out

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

          {/* New login-related routes */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/logout" element={<LogoutComponent />} />
           <Route path="/signup" element={<CreateMemberComponent />} /> {/* Updated route */}
          {/* Commented out routes for components that don't exist yet */}
          {/* <Route path="/mypage" element={<MyPageComponent />} /> */}
          {/* <Route path="/board/admin" element={<AdminBoardComponent />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;