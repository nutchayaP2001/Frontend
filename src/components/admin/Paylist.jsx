import { Breadcrumbs, Dialog, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AiFillEye, AiFillSetting, AiOutlineSearch } from 'react-icons/ai'

import { Link, useNavigate } from 'react-router-dom'

import PaymentDetail from './TablePayment'
import axios from 'axios'


const Paylist = () => {
  const [payment, setPayment] = useState([])
  const [selectData, setSelectData] = useState([])
  const [btnData, setBtnData] = useState([])
  const [query, setQuery] = useState("")
  useEffect(() => {
    loadPayment();
  },[])

  const loadPayment = async () => {
    await axios.get('https://dark-erin-gharial-ring.cyclic.app/api/payments')
    .then((res) => {
      setPayment(res.data)
      setSelectData(res.data)
      console.log(res.data)

      const dataDrop = [...new Set(res.data.map(item => 
        item.payment_status))]
        setBtnData(dataDrop)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const search = (payment) => {
    return payment.filter(
      (item) => 
      item.date_pay.toLowerCase().includes(query)||
      item.customer.CusUsername.toLowerCase().includes(query)

    )
  }
  // const search = (payment) => {
  //   return payment.filter(
  //     (item) => 
  //     item.pay_date.toLowerCase().includes(query) ||
  //     item.customer.CusUsername.toLowerCase().includes(query)

  //   )
  // }
  
  const handleSelectStatus = (itemStatus) => {
   
    const filterStatus = payment.filter((item) => {
      return item.payment_status === itemStatus
    })
    setSelectData(filterStatus)
    console.log(filterStatus)
}


  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
    รายการแจ้งชำระเงิน
      </h1>

      <Breadcrumbs
       aria-label="breadcrumb" className="text-color mt-3">
        <Link to="/home" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <h3 className="text-color">รายการแจ้งชำระเงิน</h3>
      </Breadcrumbs>
      
      
      <div className="flex">
      <div className="buttonFilter-order ">


      <button className="btn-filter " onClick={() => setSelectData(payment)}>ทั้งหมด</button>

{btnData.map((item,i) => (
<button className="btn-filter"  key={i} onClick={() => handleSelectStatus(item)} >{item}</button>

))}
</div>


               {/* <div className="input-group-user">
  <select className="text-color inp-style">
  <option value="all">ทั้งหมด</option>
  <option value="notcheck">ยังไม่ตรวจสอบ</option>
  <option value="check">ตรวจสอบแล้ว</option>
</select>
<label className="label-inp" >ค้นหา</label>

  </div> */}
  {/* <div className="btn-payment-right">
  <button className="buttons">บันทึก</button>
  </div> */}
    <div className="input-group-user inp-search-right">
            <input type="search" 
            className='inp-style'
            required
            onChange={(e) => setQuery(e.target.value)}
             />
             
            <label className="label-inp" ><span className='icon'><AiOutlineSearch/></span>ค้นหา</label>

            </div>

  </div>

<PaymentDetail
payment={search(payment && selectData)}
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
}

export default Paylist
