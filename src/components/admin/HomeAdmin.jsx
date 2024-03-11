import React from 'react'
import { Link} from 'react-router-dom'


const HomeAdmin = () => {

  return (
    <div className='bg-camera'>
      <div className='text-welcome'>
      <h2 >ระบบจัดการร้านถ่ายภาพ<br />เบสท์โฟโต้ ดิจิตอล</h2>
      <div className='btn-start'>
          <Link className='start' to={'/sells'}>เริ่มขายสินค้า</Link>
        </div>
      
      </div>

     
    </div>
  )
}

export default HomeAdmin