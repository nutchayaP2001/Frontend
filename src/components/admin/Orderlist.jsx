import React, { useEffect, useState } from 'react'
import { FaClipboardList } from 'react-icons/fa'
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AiFillEye, AiOutlineSearch } from 'react-icons/ai';
import { Breadcrumbs, Pagination } from '@mui/material';
import TableOrders from '../admin/TableOrders'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
const Orderlist = () => {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectData, setSelectData] = useState([])
  const [btnData, setBtnData] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("https://dark-erin-gharial-ring.cyclic.app/api/products");
    setProducts(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async () => {
    await axios.get("https://dark-erin-gharial-ring.cyclic.app/api/orders")
    .then(res => {
      setOrders(res.data)
      setSelectData(res.data)
      console.log(res.data)

      const dataDrop = [...new Set(res.data.map(item => 
        item.order_status
      ))]
      setBtnData(dataDrop)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  const search = (orders) => {
    return orders.filter(
      (item) => 
      item.order_date.toLowerCase().includes(query)||
      item.order_picupdate.toLowerCase().includes(query)||
      item.customer.CusUsername.toLowerCase().includes(query)

    )
  }

  const handleSelectStatus = (itemStatus) => {
   
      const filterStatus = orders.filter((item) => {
        return item.order_status === itemStatus
      })
      setSelectData(filterStatus)
      console.log(filterStatus)
  }



  // คำนวณรายการสั่งงาน
  // const getTotalOrder = () => {
  //   return 
  // }

  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
          รายการสั่งซื้อสินค้า
       
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/orders" underline="hover">
          &#9666; กลับ
        </a>
        <Breadcrumb.Item active className="text-color">รายการสั่งซื้อสินค้า</Breadcrumb.Item>
      </Breadcrumbs>
      <div className="flex">
<div className="buttonFilter-order" >

      <button className="btn-filter " onClick={() => setSelectData(orders)}>ทั้งหมด</button>

      {btnData.map((item,i) => (
      <button className="btn-filter"  key={i} onClick={() => handleSelectStatus(item)} >{item}</button>

      ))}
</div>
   <div className="input-group-user inp-search-right">
            <input type="search" 
            className='inp-style'
            required
            onChange={(e) => setQuery(e.target.value)}
             />
             
            <label className="label-inp" ><span className='icon'><AiOutlineSearch/></span>ค้นหา</label>

            </div>
  </div>

      <TableOrders
      orders={search(orders && selectData)}
      />
      
      <div className="page">
               <nav class="pagination is-rounded is-centered mt-3" role="navigation" aria-label="pagination">
  <ul class="pagination-list">
    <li><a class="pagination-link is-current" aria-label="Goto page 1">1</a></li>
  </ul>
</nav>
             </div>
             
    </div>
  )
};

export default Orderlist;
