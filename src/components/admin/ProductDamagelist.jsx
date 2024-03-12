import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TableProductDamage from './TableProductDamage'
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { Breadcrumbs } from '@mui/material';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
const ProductDamagelist = () => {
  const [damage, setDamage] = useState([]);
  const [selectData, setSelectData] = useState([])
  const [btnData, setBtnData] = useState([]);
  const [query, setQuery] = useState("")

  useEffect(() => {
    loadData();
  },[])

  const loadData = async () => {
    await axios.get('https://dark-erin-gharial-ring.cyclic.app/api/productdamages')
    .then((res) => {
      setDamage(res.data)
      setSelectData(res.data)
      console.log(res.data)

      const dataDrop = [...new Set(res.data.map(item => 
        item.status))]
        setBtnData(dataDrop)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  const search = (damage) => {
    return damage.filter(
      (item) => 
      item.date_pickupProduct.toLowerCase().includes(query)||
      item.customer.CusUsername.toLowerCase().includes(query)
    )
  }

  const handleSelectStatus = (itemStatus) => {
    const filterStatus = damage.filter((item) => {
      return item.status === itemStatus
    })
    setSelectData(filterStatus)

    console.log(filterStatus)
  }

  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered">
   รายการสินค้าชำรุด
      </h1>

      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/productdamages" underline="hover">
          &#9666; กลับ
        </a>
        <Breadcrumb.Item active className="text-color">รายการสินค้าชำรุด</Breadcrumb.Item>
      </Breadcrumbs>

      <div className="flex">
      <div className="buttonFilter-order ">


      <button className="btn-filter " onClick={() => setSelectData(damage)}>ทั้งหมด</button>

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


<TableProductDamage
damage={search(damage && selectData)}
/>

    </div>
  )
}

export default ProductDamagelist
