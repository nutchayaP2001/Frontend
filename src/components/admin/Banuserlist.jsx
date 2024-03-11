import React, { useState } from 'react'
import { FaUserAltSlash } from 'react-icons/fa'
import { TiMediaPlayReverse } from 'react-icons/ti'
import { Link } from 'react-router-dom'
// import Search from './Search'
import { Breadcrumbs, Dialog, DialogContent, DialogContentText, DialogTitle, Pagination } from '@mui/material'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

const Banuserlist = () => {
  const [open, setOpen] = useState(false);
  const functionopenpopup = () => {
    setOpen(true);
  }

  const closepopup = () => {
    setOpen(false)
  }

  const unblock = () => {
    window.confirm("คุณต้องการยกเลิกการระงับบัญชีนี้ใช่หรือไม่?")
  }
  const block = (e) => {
    e.preventDefault();
    window.location.reload();
    toast.success("ระงับบัญชีนี้สำเร็จ")

  }
  return (
    <div>
       <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
       การรายงานบัญชีผู้ใช้
      </h1>

      <Breadcrumbs
       aria-label="breadcrumb" className="text-color mt-3">
        <Link to="/home" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <h3 className="text-color">การรายงานบัญชีผู้ใช้</h3>
      </Breadcrumbs>
      {/* <div className="flex"> */}
      <div className="btn-payment-right">

{/* <Search/> */}
  {/* <button className="buttons">บันทึก</button> */}
  {/* </div> */}
</div>
<table className='table-style tableUser'>
        <thead className="has-text-centered">
          
          <tr>
            {/* <th className='text-color'>ลำดับ</th> */}
            <th className='text-color'>ชื่อผู้ใช้</th>
            <th className='text-color'>อีเมลผู้ใช้</th>
            {/* <th className='text-color'>ชื่อบัญชีผู้แจ้ง</th> */}
            <th className='text-color'>สาเหตุการระงับการใช้งานบัญชี</th>
            <th className='text-color'>ชื่อผู้แจ้งระงับ</th>
            <th className='text-color'>อีเมลผู้แจ้งระงับ</th>
            <th className='text-color '>การจัดการ</th>
        </tr>
        </thead>

        

        <tbody className="has-text-centered">
{/* {products.map((product, index) => ( */}

        <tr className='tr'>
        {/* <td className='td'>2</td> */}
            <td className='td'>nutcha<span className='text-ban icon'><BsFillExclamationTriangleFill/></span> </td>
            {/* <td className='td'>mynamebestie</td> */}
            <td className='td'>nutcha.yaya@gmail.com</td>
            <td className='td'>ใช้คำพูดไม่เหมาะสม</td>
            <td className='td'>soey</td>
            <td className='td'>soey.com@gmail.com</td>
            <td className='td widthtd'>
              <button className='btn-block' onClick={functionopenpopup}>ระงับบัญชี</button>
              <button className='btn-unblock' onClick={()=>unblock()} >ยกเลิกการระงับบัญชี</button>
            </td>
        </tr> 
        
        <tr className='tr'>
            {/* <td className='td'>1</td> */}
            <td className='td'>nutchaya</td>
            <td className='td'>nutchaya.sh@gmail.com</td>
            {/* <td className='td'>bbbb</td> */}
            <td className='td'>คอมเมนท์ข้อความไม่สุภาพ ใช้คำหยาบคาย</td>
            <td className='td'>poy</td>
            <td className='td'>poyly.eiei@gmail.com</td>
            <td className='td widthtd'>
              {/* <form>
                <div className="">
                <select className='inp-style-select'>
                  <option value="block">บล็อคผู้ใช้</option>
                  <option value="unblock">ปลดบล็อคผู้ใช้</option>
                </select>
              </div>
              </form> */}
              <button className='btn-block' onClick={functionopenpopup}>ระงับบัญชี</button>
              <button className='btn-unblock' onClick={()=>unblock()}>ยกเลิกการระงับบัญชี</button>
            </td>
        </tr> 
{/* ))}  */}
        </tbody>
        <Dialog open={open}>

<DialogTitle className='bg-dialog dialog-head'>
<p className="text-color has-text-semiblod">ระงับบัญชีผู้ใช้</p>

<span className="flex btncatRight">
  <button onClick={closepopup} className='closebtn'>X</button>
</span>
{/* <hr className='hr-detail'/> */}
</DialogTitle>
<DialogContent className='bg-dialog'>
  <DialogContentText>
  {/* <img src={Slip} className='picPaydetail' /> */}
<form className='text-color' onSubmit={block}>
<label>สาเหตุ: </label><br />
<select className='inp-reason'>
  <option value="">ไม่มี</option>
  <option value="">ละเมิดข้อกำหนดและเงื่อนไข</option>
  <option value="">ความเสี่ยงต่อความปลอดภัย</option>
  <option value="">การกระทำที่ไม่เหมาะสม</option>
  <option value="">การประพฤติผิดกฎหมาย</option>
</select>
<label>รายละเอียด: </label> <br />
<textarea  className='inp-detail' placeholder='รายละเอียด' />

 <div className="btn-payment-right">
<button className="btn-cancel-payment">ยกเลิก</button>
<button className="btn-payment" type='submit'>ระงับบัญชี</button>
</div>
</form>
 
   
  </DialogContentText>
</DialogContent>

</Dialog>


      </table>
      
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

export default Banuserlist
