import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs } from '@mui/material'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// function
// import { getUserCart } from "../../functions/userCart.js";
import TableSalesDetail from "./TableSalesDetail.jsx";
import { useParams } from "react-router-dom";


const CheckOut = () => {
const [dataCartItems, setdataCartItems] = useState([])
// const {cartItems} = useSelector(state => state.cart.cartItems)
const [msg, setMsg] = useState("");
const {id} = useParams();
useEffect(() => {
  loadData();
},[])

const loadData = async () => {
 const response = await axios.get(`/api/cart`,)
  // .then((res) => {
    setdataCartItems(response.data)
    console.log(response.data)
  // })
} 
 

  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
          รายการขายสินค้า
       
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/sells" underline="hover">
          &#9666; กลับ
        </a>
        <Breadcrumb.Item active className="text-color">รายการขายสินค้า</Breadcrumb.Item>
      </Breadcrumbs>


    <TableSalesDetail 
    dataCartItems={dataCartItems}
    />
    </div>
  );
};

export default CheckOut;
