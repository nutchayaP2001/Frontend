import React, { useEffect, useState } from 'react'
import { BsCashCoin } from 'react-icons/bs'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {  FaRegUser} from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Breadcrumbs } from "@mui/material";
import BarGraphSale from './BarGraphSale'
import BarGraph from './BarGraph'


const Saleslist = () => {
  const [user, setUsers] = useState([]);
  const [dataCartItems, setDataCartItems] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  
  
  const {id} = useParams();

  useEffect(() => {
    getUsers();
    loadData();
    loadDataOrder();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3000/api/users");
    // console.log(response.data)
    setUsers(response.data);
  
  };

  const loadData = async () => {
    const response = await axios.get('http://localhost:3000/api/cart')
       setDataCartItems(response.data)
      //  console.log(response.data)
   };

   const loadDataOrder = async () => {
    const response = await axios.get('http://localhost:3000/api/orders')
       setDataOrder(response.data)
      //  console.log(response.data)
   };
   const totalAmountOnline = dataOrder.reduce(
    (total, item) => total + item.order_price,
    0
  );
  const totalQuantityOnline = dataOrder.reduce(
    (total, item) => total + item.order_amount,
    0
  );
  //  useEffect(() => {
  //   const getCartProductById = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/cartproduct/${id}`)
  //       setDataProduct(response.data)
  //        console.log(response.data)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
        
  //     }
  //    }
  //   getCartProductById();
  //  },[id]);
 

   const totalAmount = dataCartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
      สรุปผลการขาย
      </h1>

      <Breadcrumbs
       aria-label="breadcrumb" className="text-color mt-3 mb-3">
        <Link to="/home" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <h3 className="text-color">สรุปผลการขาย</h3>
      </Breadcrumbs>
      
      <div className="flex-Dash bg-all">
      <div className="cardDash total-bd">
         <p className='text-color'><span className='iconDashboard'><BsCashCoin /></span> ยอดขายทั้งหมด</p>
         <p className='text-price text-color'>{(totalAmount+totalAmountOnline).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )} บาท</p>
        </div>
        <div className="cardDash product-bd">
         <p className='text-color'><span className='iconDashboard'><AiOutlineShoppingCart /></span> รายการขายทั้งหมด</p> 
         <p className='text-price text-color'>{(dataCartItems.length + dataOrder.length)} รายการ</p>
        </div>
      </div>
     
     
      <div className="flex-Dash bg-all">
        {/* <div className="inline"> */}
        {/* <div className="btn-left">
        <button>วันนี้</button>
        <button>สัปดาห์นี้</button>
        <button>เดือนนี้</button>
        <button>12 เดือนย้อนหลัง</button>
        </div> */}
         {/* <div className="cardDash user-bd">
         <p className='text-color'><span className='iconDashboard'><FaRegUser /></span> จำนวนผู้ใช้งานระบบ</p>
         <p className='text-price text-color'>{user.length} คน</p>
        </div>  */}

        
        <div className="cardDash total-bd">
         <p className='text-color'><span className='iconDashboard'><BsCashCoin /></span> ยอดขายทั้งหมด (หน้าร้าน)</p>
         <p className='text-price text-color'>{(totalAmount).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )} บาท</p>
        </div>
        <div className="cardDash product-bd">
         <p className='text-color'><span className='iconDashboard'><AiOutlineShoppingCart /></span> รายการขายทั้งหมด (หน้าร้าน)</p> 
         <p className='text-price text-color'>{dataCartItems.length} รายการ</p>
        </div>
  

        <div className="cardDash total-bd">
         <p className='text-color'><span className='iconDashboard'><BsCashCoin /></span> ยอดขายทั้งหมด (ออนไลน์)</p>
         <p className='text-price text-color'>{(totalAmountOnline).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )} บาท</p>
        </div>

        <div className="cardDash product-bd">
         <p className='text-color'><span className='iconDashboard'><AiOutlineShoppingCart /></span> รายการขายทั้งหมด (ออนไลน์)</p> 
         <p className='text-price text-color'>{dataOrder.length} รายการ</p>
        </div>
        
        </div>

        <div className='summaryProduct'>
        <div className="cardDashProduct">
         <p className='text-color mb-3'>จำนวนสินค้าที่ขายได้แต่ละรายการ (หน้าร้าน)</p> 
         <BarGraph/>
        </div>
        <div className="cardDashProduct">
         <p className='text-color mb-3'>จำนวนสินค้าที่ขายได้แต่ละรายการ (ออนไลน์)</p> 
         <BarGraphSale/>
        </div>
        </div>

    </div>
  )
}

export default Saleslist;
