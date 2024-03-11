import React, { useEffect, useState } from 'react'
import ProductTableInSale from './ProductTableInSale'
import { useDispatch, useSelector } from 'react-redux';
// import { userCart } from '../../functions/userCart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart, getTotals } from '../../features/cartSlice';
const ListProductSale = () => {
  const { cart} = useSelector((state) => ({ ...state.cart.cartItems }));
// const {cartTotalQuantity, cartTotalAmount} = useSelector(state => state.cart) 

  // const cart = useSelector((state) => state.cart);
const dispatch = useDispatch();

  const navigate = useNavigate();


//   const componentRef = useRef();

//   const handleReactToPrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
// const handlePrint = () => {
//   handleReactToPrint();
// }

// ตารางรายการสินค้า
// const showCartItem = () => (
//   <div>
 

// <table className="table-sale has-text-centered ">
//     <thead>
//       <tr>
//         {/* <th>ลำดับ</th> */}
//         <th className="text-color" >สินค้า</th>
//         <th className="text-color">จำนวน  <br />(กรอบ/แพ็ค/อัน/ตู้)</th>
//         <th className="text-color">ราคา <br /> (บาท)</th>
//         <th className="text-color">จัดการ</th>
//       </tr>
//     </thead>

//     {cart.cartItems.map((item) => 
//       <ProductTableInSale item={item} key={item.id}
//       />
//     )}
//   </table>
// </div>


// );
  return (
    <div>
        <div className="cardOrder">
        <h2 className="is-size-3 has-text-weight-semibold has-text-centered text-color mt-3">ขายสินค้า (หน้าร้าน)</h2>
        
          <ProductTableInSale/>
          
        </div>
    </div>
  )
}

export default ListProductSale