import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from '../../asset/img/LogoBestPhoto.png'
import Divider from '@mui/material/Divider';
import { FaRegHeart } from 'react-icons/fa';
const PopupComponent = ({id, onClose}) => {

    const [data, setData] = useState([]);
    const [productData, setProductData] = useState([])

    const formatData = (dateString) => {
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        };
        const thaiDate = new Intl.DateTimeFormat("th-TH", options).format(
          new Date(dateString)
        );
        return thaiDate;
      };
    useEffect(() => {
        const getCartItemsById = async () => {
            try {
                const response = await axios.get(`/api/cart/${id}`)
                setData(response.data)
                // setProductData(response.data.product.ProName)
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getCartItemsById();
      },[id]);

      const groupedProduct = data.reduce((acc, product) => {
        const salesNo = product.sale.salesNo;
        if(!acc[salesNo]){
          acc[salesNo] = [];
        }
        acc[salesNo].push(product);
        return acc;
      },{})

      const filteredProducts = Object.values(groupedProduct)
.filter(data => data.length >= 1);


  return (
    
<div className='bgPopup'  onClick={onClose} >
  {data ? (
 <div className='popup'>

 <button onClick={onClose} className='close-btn'>X</button>

    <div className="popup-content">
   
         {filteredProducts.map((item,index) => ( 

     
         <div>

 <h4 className='is-size-4 has-text-weight-semibold mb-3'>ใบเสร็จรับเงิน</h4>

<div className="popuphead">
         <div className="imgPopup">
             <img src={logo} alt="โลโก้เบสท์โฟโต้" />
         </div>
         <div className='textheadpopup'>
           <h3 className='is-size-5 has-text-weight-semibold'>ร้านเบสท์โฟโต้ ดิจิตอล</h3> 
           <p>25 หมู่ 8 ต.ฟ้าหยาด อ.มหาชนะชัย จ.ยโสธร เลขที่ผู้เสียภาษี 3350600122711 โทร. 093-3289252, 093-3289262</p>  
         </div>
     </div>
                 <div className='popupDetail'>
            <b>เลขที่การขาย: </b> {item[0].sale.salesNo} 
         &nbsp; <b>วันที่:</b> {formatData(item[0].createdAt)} น.
         </div>
             {/* ))} */}
         
         <table className='table-style tableUser'>
             <thead>
                 <tr>
                     <th>ลำดับ</th>
                     <th className='listProduct'>รายการสินค้า</th>
                     <th>ราคาขาย (บาท)</th>
                     <th>จำนวน</th>
                     <th>หน่วย</th>
                     <th>ราคารวม (บาท)</th>
                 </tr>
             </thead>
             <tbody>
             {item.map((p,index)=> (

                 <tr className='td'>
                     <td className='paddingTB'>{index + 1}</td>
                           <td className='paddingTB listProduct'>{p.product.ProName}</td>  


                     <td className='paddingTB'>{(p.product.ProPrice).toLocaleString(
                 "en-US",
                 {
                   minimumFractionDigits: 2,
                   maximumFractionDigits: 2,
                 }
               )}</td>
                     <td className='paddingTB'>{p.quantity}</td>
<td className='paddingTB'>{p.product.ProUnit}</td>

                     <td className='paddingTB'>{(p.totalPrice).toLocaleString(
                 "en-US",
                 {
                   minimumFractionDigits: 2,
                   maximumFractionDigits: 2,
                 }
               )}</td>

                     
                 </tr>
                     ))}

             </tbody>
         </table>

                 <div className="bottomTB">

                     <div className="sign">
                         <div className="payee">
                            <p>_______________</p>
                            <p>ผู้รับเงิน</p>
                         </div>
                         <div className="receiver">
                            <p>_______________</p>
                            <p>ผู้รับสินค้า</p>
                         </div>
                     </div>
                 <div className="totalPrice">
             <div className='price'>
                 <p>ราคารวมสินค้า (บาท) <span className='totalSales'>{(item[0].sale.TotalSalesPrice).toLocaleString(
                 "en-US",
                 {
                   minimumFractionDigits: 2,
                   maximumFractionDigits: 2,
                 }
               )}</span></p> 
             </div>
             <div className='Sumprice'>
                 <p>ราคารวมสุทธิ (บาท) <span className='SumSales'>{(item[0].sale.TotalSalesPrice).toLocaleString(
                 "en-US",
                 {
                   minimumFractionDigits: 2,
                   maximumFractionDigits: 2,
                 }
               )}</span></p> 
             </div>
         </div>
                 </div>

                 <div className="footerTB">
                 <Divider><FaRegHeart className='coloricon' /></Divider>

                     <p className='text-footer text-color'>ขอบคุณที่ใช้บริการ พนักงาน : {item[0].user.userEmail}</p>
                 </div>

         </div>
         
     ))}

<button onClick={()=> window.print()} className='btnPrint text-color'>พิมพ์ใบเสร็จ</button>
        

    </div>
 </div>
  ): (
    <p>Loading...</p>
  )}
   
    </div>
  )
}

export default PopupComponent;