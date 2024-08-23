import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import ItemList from './Admin/ItemList';
import MemberList from './Admin/MemberList';
import AdminNoticeList from './Admin/AdminNoticeList';
import ItemDetail from "./ItemDetail";
import ReviewDetail from "./ReviewDetail";
import ItemInsert from "./ItemInsert";
import CategoryItemList from './Category/CategoryItemList';
import MainPage from './Main/Main';
import CategoryList from './Category/CategoryList';
import LoginComponent from './Components/LoginComponent';
import LogoutComponent from './Components/LogoutComponent';
import CreateMemberComponent from './Components/CreateMemberComponent';
import MyPageComponent from './Components/MyPageComponent';
import CartComponent from './Components/CartComponent';
import PaymentComponent from './Components/PaymentComponent';
import NoticeList from './Notice/NoticeList';
import NoticeView from './Notice/NoticeView';
import NoticeForm from './Notice/NoticeForm';
import Admin from './Admin/Admin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/items" element={<ItemList />} />
              <Route path="/admin/members" element={<MemberList />} />
              <Route path="/admin/notices" element={<AdminNoticeList />} />
              <Route path="/admin/notices/new" element={<NoticeForm />} />
              <Route path="/admin/notices/:noticeNo/edit" element={<NoticeForm />} />
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;