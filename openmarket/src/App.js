import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Header from './Header';
import AdminHeader from './Admin/AdminHeader';
import Footer from './Footer';
import ItemList from './Admin/ItemList';
import AdminItemDetail from './Admin/AdminItemDetail';
import MemberList from './Admin/MemberList';
import BrandList from './Admin/BrandList';
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
import DeliveryListComponent from './Components/DeliveryListComponent';
import SearchResults from './Category/SearchResult';
import ItemUpdateForm from './ItemUpdateForm';
import OrderStatistics from './Admin/OrderStatistics';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Admin routes */}
            <Route path="/admin/*" element={
              <>
                <AdminHeader />
                <Routes>
                  <Route index element={<Admin />} />
                  <Route path="items" element={<ItemList />} />
                  <Route path="items/:itemId" element={<AdminItemDetail />} />
                  <Route path="members" element={<MemberList />} />
                  <Route path="brands" element={<BrandList />} />
                  <Route path="notices" element={<AdminNoticeList />} />
                  <Route path="notices/new" element={<NoticeForm />} />
                  <Route path="notices/:noticeNo/edit" element={<NoticeForm />} />
                  <Route path="order-statistics" element={<OrderStatistics />} />
                </Routes>
              </>
            } />

            {/* Non-admin routes */}
            <Route path="*" element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categoryitems/category/:categoryId" element={<CategoryItemList />} />
                    <Route path="/categoryitems/gubun/:gubunSubCode" element={<CategoryItemList />} />
                    <Route path="/item/:id" element={<ItemDetail />} />
                    <Route path="/item/insert" element={<ItemInsert />} />
                    <Route path="/item/:id/edit" element={<ItemUpdateForm />} />
                    <Route path="/review/detail/:reviewId" element={<ReviewDetail />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    <Route path="/signup" element={<CreateMemberComponent />} />
                    <Route path="/mypage" element={<MyPageComponent />} />
                    <Route path="/mypage/cart" element={<CartComponent />} />
                    <Route path="/mypage/cart/payment/:orderId" element={<PaymentComponent />} />
                    <Route path="/mypage/cart/payment" element={<PaymentComponent />} />
                    <Route path="/notices" element={<NoticeList />} />
                    <Route path="/notices/:noticeNo" element={<NoticeView />} />
                    <Route path="/mypage/deliverylist" element={<DeliveryListComponent />} />
                    <Route path="/search" element={<SearchResults />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;