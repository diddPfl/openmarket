import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

// Components
import Header from "./Header";
import Footer from './Footer';
import ItemDetail from "./ItemDetail";
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
import DeliveryListComponent from './Components/DeliveryListComponent';
import SearchResults from './Category/SearchResult';
import ItemDisable from './ItemDisable';
import ItemUpdateForm from './ItemUpdateForm';

// Admin Components
import AdminHeader from './Admin/AdminHeader';
import Admin from './Admin/Admin';
import ItemList from './Admin/ItemList';
import MemberList from './Admin/MemberList';
import BrandList from './Admin/BrandList';
import AdminNoticeList from './Admin/AdminNoticeList';
import OrderStatistics from './Admin/OrderStatistics';

// Notice Components
import NoticeList from './Notice/NoticeList';
import NoticeView from './Notice/NoticeView';
import NoticeForm from './Notice/NoticeForm';

// Other Components
import ReviewDetail from "./ReviewDetail";

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
                  <Route path="item/insert" element={<ItemInsert />} />
                  <Route path="members" element={<MemberList />} />
                  <Route path="brands" element={<BrandList />} />
                  <Route path="item/:{ItemId}/disable" element={<ItemDisable/>} />
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
                    <Route path="/item/:itemId/disable" element={<ItemDisable />} />
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