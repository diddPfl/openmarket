import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import ReviewDetail from "./ReviewDetail";
import ItemInsert from "./ItemInsert";
import CategoryItemList from './Category/CategoryItemList';
import MainPage from './Main/Main';
import CategoryList from './Category/CategoryList';
import { AuthProvider } from './context/AuthContext';
import LoginComponent from './Components/LoginComponent';
import LogoutComponent from './Components/LogoutComponent';
import CreateMemberComponent from './Components/CreateMemberComponent';
import MyPageComponent from './Components/MyPageComponent';
import CartComponent from './Components/CartComponent';
import PaymentComponent from './Components/PaymentComponent';
import NoticeList from './Notice/NoticeList';
import NoticeView from './Notice/NoticeView';
import NoticeForm from './Notice/NoticeForm';

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
              <Route path="/review/detail/:reviewId" element={<ReviewDetail />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/logout" element={<LogoutComponent />} />
              <Route path="/signup" element={<CreateMemberComponent />} />
              <Route path="/mypage" element={<MyPageComponent />} />
              <Route path="/mypage/cart" element={<CartComponent />} />
              <Route path="/mypage/cart/payment/:orderId" element={<PaymentComponent />} />
              <Route path="/notices" element={<NoticeList />} />
              <Route path="/notices/:noticeNo" element={<NoticeView />} />
              <Route path="/notices/new" element={<NoticeForm />} />
              <Route path="/notices/:noticeNo/edit" element={<NoticeForm />} />
              <Route path="/notices/:noticeNo/edit" element={<NoticeForm />} />
            </Routes>
          </div>
        </Router>
    </AuthProvider>
  );
}

export default App;
