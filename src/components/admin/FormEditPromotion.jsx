import { Breadcrumbs } from '@mui/material'
import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const FormEditPromotion = () => {
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold text-color has-text-centered">
       แก้ไขโปรโมชัน
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/promotions" underline="hover">
          &#9666; กลับ
        </a>
        <a href="/promotions" underline="hover">
        รายการโปรโมชัน
        </a>
        <Breadcrumb.Item active className="text-color">แก้ไขโปรโมชัน</Breadcrumb.Item>
      </Breadcrumbs>
    </div>
  )
}

export default FormEditPromotion