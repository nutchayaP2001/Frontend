import React from 'react'
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TableProductDamage = ({damage}) => {
  return (
    <div>
          <table className='table-style tableUser'>
        <thead className="has-text-centered">
          <tr>
            <th className='text-color'>ลำดับ</th>
            <th className='text-color'>วันที่รับสินค้า</th>
            <th className='text-color'>สินค้าที่ชำรุด</th>
            <th className='text-color'>ชื่อลูกค้า</th>
            <th className='text-color'>สถานะ</th>
            <th className='text-color'>หมายเหตุ</th>
            <th className='text-color'>รายละเอียดสินค้าชำรุด</th>
        </tr>
        </thead>

        
        {
        damage.length < 1 && <tr>
          <td className='td has-text-centered text-color' colSpan={7}>ไม่พบรายการที่ค้นหา</td>
        </tr>
      }
        <tbody className="has-text-centered">
{damage.map((item, index) => (
<tr className='tr'>
            <td className='td'>{index + 1}</td>
            <td className='td'>{item.date_pickupProduct}</td>
            <td className='td'>{item.category.CatName}</td>
            <td className='td'>{item.customer.CusUsername}</td>
            
            <td className="td">{item.status}</td>
            <td className="td">{item.admin_note}
            </td>
            <td className='td'>
            <Link to={`/prodamagedetail/${item.id}`} className='text-color'><AiFillEye/></Link>
            </td>
        </tr> 
         
))} 
        </tbody>
     
      </table>
    </div>
  )
}

export default TableProductDamage;