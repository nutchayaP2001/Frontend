import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const TableOrders = ({orders}) => {
  return (
    <div>
      <div className="container">
        <table className="table-style tableUser">
        
        <thead className="has-text-centered">
          <tr>
            <th className=' text-color'>ลำดับ</th>
            <th className=' text-color'>วันที่สั่งงาน</th>
            <th className=' text-color'>วันที่นัดรับสินค้า</th>
            <th className=' text-color'>จำนวนที่สั่ง</th>
            <th className=' text-color'>ราคาทั้งหมด (บาท)</th>
            <th className=' text-color'>ชื่อผู้สั่ง</th>
            <th className=' text-color'>รายละเอียดการสั่งซื้อ</th>
            <th className=' text-color'>สถานะ</th>
          </tr>
        </thead>

        {
        orders.length < 1 && <tr>
          <td className='td has-text-centered text-color' colSpan={8}>ไม่พบรายการที่ค้นหา</td>
        </tr>
      }
        <tbody className="has-text-centered">
          {orders.map((item, index) => (
            <tr key={index} className="tr ">
              <td className="td">{index+1}</td>
              <td className="td ">
                {item.order_date}
              </td>
              <td className="td">{item.order_picupdate}</td>
              <td className="td">
                {item.order_amount}
              </td>
              <td className="td">{item.order_price}</td>
              <td className="td">{item.customer.CusUsername}</td>
              <td className="td">
              <Link to={`/orderdetail/${item.id}`} className='text-color icon'><AiFillEye/></Link>
              </td>
              <td className="td">{item.order_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
  )
}

export default TableOrders