import React from "react";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import ItemInsert from "./ItemInsert";
import CategoryItemList from './Category/CategoryItemList';
import MainPage from './Category/Main';
import CategoryList from './Category/CategoryList';
import { AuthProvider } from './context/AuthContext';
import LoginComponent from './Components/LoginComponent';
import LogoutComponent from './Components/LogoutComponent';
import CreateMemberComponent from './Components/CreateMemberComponent';
import MyPageComponent from './Components/MyPageComponent';
import CartComponent from './Components/CartComponent';
import PaymentComponent from './Components/PaymentComponent';

function App() {
  return (
    <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categoryitems/category/:categoryId" element={<CategoryItemList />} />
              <Route path="/categoryitems/gubun/:gubunSubCode" element={<CategoryItemList />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/item/insert" element={<ItemInsert />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/logout" element={<LogoutComponent />} />
              <Route path="/signup" element={<CreateMemberComponent />} />
              <Route path="/mypage" element={<MyPageComponent />} />
              <Route path="/mypage/cart" element={<CartComponent />} />
              <Route path="/mypage/cart/payment" element={<PaymentComponent />} />
            </Routes>
          </div>
        </Router>
    </AuthProvider>
  );
}

export default App;
