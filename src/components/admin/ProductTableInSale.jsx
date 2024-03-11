import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  postCartToDatabase,
  setCartDetails,
  removeFromCart,
  updateProductCount,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cartSlice";
// import PayButton from "../PayButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { userCart } from "../../functions/userCart";

const ProductTableInSale = ({ item, productId, ProQuantity, product,increaseSaleNumber }) => {
  const dispatch = useDispatch();
  // const {ProName,ProSize,ProURL,category,ProPrice,id} = product
  // const [productId, setProductId] = useState('');
  // const [quantity,setQuantity] = useState('');
  // const [total, setTotal] = useState('');
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [quantity, setQuantity] = useState(1);
  const cartDetails = useSelector((state) => state.cart.cartDetails);
  const navigate = useNavigate();
  const [cartSaved, setCartSave] = useState(false);
  const [salesNumber, setSalesNumber] = useState(1)
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.ProPrice * item.quantity,
    0
  );

  // วันที่
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);
  
  
  const generateProductNumber = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() + 543;
    const lastTwoDigitsOfYear = currentYear.toString().slice(-2);
    const currentMonth = currentDate.getMonth() + 1;
    const formmattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    const randomDigits = Math.floor(Math.random() * 100000);
    const formattedNumber = randomDigits.toString().padStart(5,'0');
    return `BP${lastTwoDigitsOfYear}${formmattedMonth}-${formattedNumber}`;
  }
  
  const productNumber = React.useMemo(() => generateProductNumber(), []);
  


  const handleCheckout = async () => {
    const salesNo = productNumber
    
    try {
      
      if(window.confirm("บันทึกรายการสินค้า")){
        await axios.post('http://localhost:3000/api/cart', {salesNo,cartItems})
        dispatch(postCartToDatabase(salesNo,cartItems));
        toast.success("บันทึกรายการสำเร็จ");
        navigate("/checkout");
        localStorage.removeItem("cartItems");
        // postSaleNumber()
      }
    } catch (error) {
      console.log(error);
    }
    
   
   
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("ล้างรายการสำเร็จ");
    localStorage.removeItem("cartItems");
  };

  const handleRemoveFromCart = (productId,ProName) => {
    dispatch(removeFromCart(productId));
    toast.success(`ลบรายสินค้าสำเร็จ` );

  };

  const handleChangeCount = (productId, newQuantity, ProQuantity, ProUnit) => {
    if (newQuantity > ProQuantity) {
      toast.error(`สินค้าคงเหลือ ${ProQuantity} ${ProUnit}`);
    } else if (newQuantity < 1) {
      toast.error(`ปริมาณสินค้าต้องไม่ต่ำกว่า 1 ${ProUnit}`);
    } else {
      dispatch(updateProductCount(productId, newQuantity));
    }
  };

  return (
    <div className="cart-container">
      <div className="flex-Search">
          <div className="input-group-sale" aria-disabled>
          <input
            type="text"
            className="inp-style-nobg"
            required
            // disabled
            // onChange={(e) => setSalesNumber(e.target.value)}
            value={productNumber}
          />
          <label className="label-inp">เลขที่การขาย</label>
        </div>

        <div className="input-group-sale ml-4">
          <input
            type="date"
            className="inp-style-sale"
            required
            defaultValue={date}
          />
          <label className="label-inp">วัน/เวลา</label>
        </div>

          </div>
          
      <h2 className="mt-3">รายการขายสินค้า </h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>ไม่มีรายการสินค้า</p>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">สินค้า ({totalQuantity})</h3>
            <h3 className="price">ราคา (บาท)</h3>
            <h3 className="quantity">จำนวนสินค้า</h3>
            <h3 className="total">ราคารวม (บาท)</h3>
          </div>
          {/* <form > */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item " key={item.productId}>
                <div className="cart-product">
                  <img src={item.product.ProURL} alt={item.product.ProName} />
                  <div>
                    <h3>{item.product.ProName}</h3>
                    <p>{item.product.ProDes}</p>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                    >
                      ลบรายการสินค้า
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">
                  {(item.product.ProPrice).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </div>
                <div className="cart-product-quantity">
                  {/* <input type="number" name='count' value={item.quantity} className="text-color has-text-centered inp-number"
            onChange={handleChangeCount} 
            /> */}
                  <button
                    onClick={() =>
                      handleChangeCount(
                        item.productId,
                        item.quantity - 1,
                        item.product.ProQuantity,
                        item.product.ProUnit
                      )
                    }
                  >
                    -
                  </button>
                  <div className="count">{item.quantity}</div>
                  <button
                    onClick={() =>
                      handleChangeCount(
                        item.productId,
                        item.quantity + 1,
                        item.product.ProQuantity,
                        item.product.ProUnit
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  {(item.product.ProPrice * item.quantity).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={handleClearCart}>
              ล้างทั้งหมด
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>ราคารวมสุทธิ</span>
                <span className="amount">
                  {totalAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  บาท
                </span>
              </div>
              <button onClick={handleCheckout}>ชำระเงิน</button>
            </div>
          </div>
          {/* </form> */}
        </div>
      )}
    </div>
  );
};

export default ProductTableInSale;
