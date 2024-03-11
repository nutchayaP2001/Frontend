import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumbs } from '@mui/material'
import { toast } from 'react-toastify'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import axios from 'axios'

const OrderDetail = () => {
  const navigate = useNavigate();
  const [order_status, setOrderStatus] = useState("")
  const [proimage, setProimage] = useState([])
  const [preview, setPreview] = useState("");
  const [proname, setProname] = useState('');
  const [prodes, setProdes] = useState('');
  const [prosize, setProsize] = useState('');
  const [proprice, setProprice] = useState('');
  const [order_amount, setOrderAmount] = useState('')
  const [prounit, setProunit] = useState('')
  const [category, setCategory] = useState('')
  const [order, setOrder] = useState('')
  const [data, setData] = useState([])

  const {id} = useParams();
  const [msg, setMsg] = useState("");


const loadImage = (e) => {
  const image = e.target.files[0];
setProimage(image);
setPreview(URL.createObjectURL(image))
}


  useEffect(() => {
    const getOrdersById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/orders/${id}`)
        setOrderStatus(response.data.order_status);
        setProimage(response.data.product.ProImage)
        setProname(response.data.product.ProName)
        setProprice(response.data.product.ProPrice)
        setProdes(response.data.product.ProDes)
        setProsize(response.data.product.ProSize)
        setOrderAmount(response.data.order_amount)
        setProunit(response.data.product.ProUnit)
        setCategory(response.data.category.CatName)
        setOrder(response.data.id)
        setPreview(response.data.product.ProURL)
        console.log(response.data)
      } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg);
        }
      }
}
    getOrdersById();
  },[id]);




// const updateStatus = async (id) => {
//   await axios.patch(`http://localhost:3000/orders/${id}`)
// }

  const updateOrderStatus = async (e) => {
e.preventDefault();
try {
  await axios.patch(`http://localhost:3000/api/orderstatus/${id}`,{
    order_status : order_status
  })
  .then((res) => {
    toast.success("อัพเดตสถานะสำเร็จ")
  navigate("/orders")
  console.log(res)
  })
  .catch((err) => {
    toast.error("การเดตสถานะผิดพลาด")
    console.log(err)
  })

} catch (error) {
  if(error.response) {
    setMsg(error.response.data.msg)
  }
}

  }
  const handleCancel = () => {
    try {
      if(window.confirm('คุณต้องการยกเลิกใช่หรือไม่ ?')){
        toast.success('ยกเลิกสำเร็จ')
        navigate('/orders')
      }
     
    } catch (error) {
      console.log(error);
      toast.error('ไม่สามารถยกเลิกได้')
    }
   }
  return (
    <div>
         <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
          รายละเอียดการสั่งซื้อสินค้า
       
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/orders" underline="hover">
          &#9666; กลับ
        </a>
        <a href="/orders" underline="hover">
        รายการสั่งซื้อสินค้า
        </a>
        <Breadcrumb.Item active className="text-color">รายละเอียดการสั่งซื้อสินค้า</Breadcrumb.Item>
      </Breadcrumbs>

      <div className="headerOrder text-color">
        <div className="flex-order">
            <p className='text-color is-size-5 text-header'>รายการสั่งซื้อที่ {order}</p>
        <div className="confirm-order">
        <form className='text-color'>
        <label>จัดการรายการสั่งซื้อสินค้า: &nbsp;</label>
<select 
value={order_status}
onChange={(e) => setOrderStatus(e.target.value)}
className='inp-style-status' required>
<option selected>รอดำเนินการ</option>
<option value="ยังดำเนินการไม่เสร็จสิ้น">ยังดำเนินการไม่เสร็จสิ้น</option>
<option value="ดำเนินการเสร็จสิ้นแล้ว">ดำเนินการเสร็จสิ้นแล้ว</option>
</select>

                {/* <input type="radio" name="check" value="ยังไม่เสร็จ" defaultChecked/> ยังไม่เสร็จ &nbsp;
                <input type="radio" name="check" value="เสร็จแล้ว" /> เสร็จแล้ว */}

                {/* <Link to="/orders" > */}
                <button type="submit" onClick={handleCancel} className="btn-cancel-order">
                ยกเลิก
              </button>
                  <button className='btn-save-order' type="submit" onClick={updateOrderStatus} >บันทึก</button>
                  
                  {/* </Link> */}
              </form>
        </div>
        </div>
        
      </div>
      
     

      <div className="orderDetail text-color">
        <div className="flex-orderdetail">
            <input type="checkbox" name="check" className='checkbox'  />
        <img src={preview} className='picOrderdetail' />
        <div className='text-width'>
         <p className='text-detail' >
          <b>หมวดหมู่:</b> {category} <br />
          <b>ชื่อสินค้า:</b> {proname} <br />
          <b>รายละเอียดสินค้า:</b> {prodes}<br />
          <b>ขนาดสินค้า:</b> {prosize}
        </p> 
        </div>
        
<div className='text-width'>
  <p className="text-price-detail">

          <b>ราคาสินค้า/หน่วย:</b>  {proprice} บาท <br />
          <b>จำนวนที่สั่ง:</b>  {order_amount} {prounit}
        </p>
</div>
        
        <div className='text-width'>
          <p className="text-price-detail">
           <b>ราคารวม:</b> {proprice*order_amount} บาท
        </p>
        </div>

        

        </div>
        <hr className='hr-detail' />

    <div className="summary-detail">
        <p><span className='has-text-weight-semibold '>ราคารวมสุทธิ:</span> {proprice*order_amount} บาท</p>
    </div>
      </div>
    </div>
  )
}

export default OrderDetail