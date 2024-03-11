import { Breadcrumbs } from '@mui/material'
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import CardPromotion from './CardPromotion'
const Promotionlist = () => {
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
          รายการโปรโมชัน
       
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/home" underline="hover">
          &#9666; กลับ
        </a>
        <Breadcrumb.Item active className="text-color">รายการโปรโมชัน</Breadcrumb.Item>
      </Breadcrumbs>

      {/* <CardPromotion/> */}
    </div>
  )
}

export default Promotionlist