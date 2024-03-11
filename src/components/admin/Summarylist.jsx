import React from 'react'
import { IoStatsChart } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import BarGraph from './BarGraph'

const Summarylist = () => {
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered">
    สถิติการขายสินค้า
      </h1>

      <div className="flex-btnhead">
        <Link to="/home" className="btn-back">
        &#9666; กลับ
        </Link>
      </div>
      <div className="flex-Dash">
        <div className="inline">
        <div className="btn-left">
        <button>วันนี้</button>
        <button>สัปดาห์นี้</button>
        <button>เดือนนี้</button>
        <button>12 เดือนย้อนหลัง</button>
        </div>
        <div className="cardDash">
         <p>สรุปการขายสินค้าประจำวัน</p>
         <p className='text-price'>320 ชิ้น</p>
        </div>
        <div className="cardDash">
         <p>สรุปการขายสินค้าประจำสัปดาห์</p> 
         <p className='text-price'>840 ชิ้น</p>
        </div>
        <div className="cardDash">
         <p>สรุปการขายสินค้าประจำเดือน</p> 
         <p className='text-price'>2,403 ชิ้น</p>
        </div>
        <div className="cardDash">
         <p>สรุปการขายสินค้า 12 เดือนย้อนหลัง</p> 
         <p className='text-price'>4,697 ชิ้น</p>

        </div>
        </div>
        <div className="cardBestsaler">
        <p>สินค้าขายดี ประจำวันนี้</p>
        <div className="btn-product-right">
        <button>สัปดาห์นี้</button>
        <button>เดือนนี้</button>
        <button>12 เดือนย้อนหลัง</button>
        </div>
        <div className="GraphCenter">
        <BarGraph className="colorGraph" />

        </div>
        
        </div>
        </div>
    </div>
  )
}

export default Summarylist
