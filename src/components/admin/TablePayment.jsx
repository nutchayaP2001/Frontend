import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const TablePayment = ({payment}) => {
  return (
      <div>
      <div className="container">
        <table className="table-style tableUser">
        
        <thead className="has-text-centered">
          <tr>
            <th className=' text-color'>ลำดับ</th>
            <th className=' text-color'>ธนาคาร</th>
            <th className=' text-color'>วันที่/เวลาที่ชำระเงิน</th>
            <th className=' text-color'>จำนวนเงินที่ชำระ</th>
            <th className=' text-color'>ชื่อลูกค้า</th>
            <th className=' text-color'>รายละเอียดการชำระเงิน</th>
            <th className=' text-color'>สถานะ</th>
          </tr>
        </thead>

        {
        payment.length < 1 && <tr>
          <td className='td has-text-centered text-color' colSpan={7}>ไม่พบรายการที่ค้นหา</td>
        </tr>
      }
        <tbody className="has-text-centered">
          {payment.map((item, index) => (
            <tr key={index} className="tr ">
              <td className="td">{index+1}</td>
              <td className="td ">
                {item.bank}
              </td>
              <td className="td">{item.date_pay}</td>
              <td className="td">
                {item.total}
              </td>
              <td className="td">{item.customer.CusUsername}</td>
              <td className="td">
              <Link to={`/paydetail/${item.id}`} className='text-color'><AiFillEye/></Link>
              </td>
              <td className="td">{item.payment_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
  )
}

export default TablePayment;