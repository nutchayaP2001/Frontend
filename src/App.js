import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from '@mui/material/CssBaseline';
// Admin
import WelcomAdmin from "./pages/admin/WelcomAdmin";
import Login from "./components/admin/Login";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Pays from "./pages/admin/Pays";
import PayDetail from "./pages/admin/PaymentDetail";
import Category from "./pages/admin/Category";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import Banuser from "./pages/admin/Banuser";
import Productdamage from "./pages/admin/Productdamage";
import ProductdamageDetail from "./pages/admin/ProductdamageDetail";
import Sales from "./pages/admin/Sales";
import Summary from "./pages/admin/Summary";
import Checkout from "./pages/admin/CheckOutOrder";
import Money from "./pages/admin/Money";
import Sell from "./pages/admin/Sell";
import Order from "./pages/admin/Order";
import OrderDetail from "./pages/admin/Orderdetail";
import Promotion from "./pages/admin/Promotion";
import AddPromotion from "./pages/admin/AddPromotion";
import EditPromotion from "./pages/admin/EditPromotion";
import ShowPopup from "./pages/admin/PopupPage"
function App() {
  return (
    <BrowserRouter>
    <div>
    <ToastContainer />
        <CssBaseline />

      <Routes>
      <Route path="/" element={<Login/>}/>

        <Route path="/home" element={<WelcomAdmin/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/add" element={<AddUser/>} />
      <Route path="/users/edit/:id" element={<EditUser/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="/category/add" element={<AddCategory/>} />
      <Route path="/category/edit/:id" element={<EditCategory/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/products/add" element={<AddProduct/>} />
      <Route path="/products/edit/:id" element={<EditProduct/>} />
        <Route path="/pays" element={<Pays/>}/>
        <Route path="/paydetail/:id" element={<PayDetail/>}/>
        <Route path="/banusers" element={<Banuser/>} />
      <Route path="/productdamages" element={<Productdamage/>} />
      <Route path="/prodamagedetail/:id" element={<ProductdamageDetail/>} />
      <Route path="/sales" element={<Sales/>} />
      <Route path="/money" element={<Money/>} />
      <Route path="/summary" element={<Summary/>} />
      <Route path="/sells" element={<Sell/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/orders" element={<Order/>} />
      <Route path="/orderdetail/:id" element={<OrderDetail/>} />
      <Route path="/promotions" element={<Promotion/>}/>
      <Route path="/promotions/add" element={<AddPromotion/>}/>
      <Route path="/promotions/edit/:id" element={<EditPromotion/>}/>
    <Route path="/showproduct/:id" element={<ShowPopup/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
