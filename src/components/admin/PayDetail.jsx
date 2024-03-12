import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@mui/material';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
const PayDetail = () => {
  const navigate = useNavigate();
  const [payment_status, setPayStatus] = useState('');
  const [bank, setBank] = useState('');
  const [date_pay, setDatePay] = useState('');
  const [total, setTotal] = useState('');
  const [slipImage, setSilpImage] = useState('')
  const [preview, setPreview] = useState('')
  const {id} = useParams();
  const [msg, setMsg] = useState('')
  const [paymentid, setPaymentId] = useState('') 
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [proimage, setProimage] = useState([])
  const [previewproduct, setPreviewProduct] = useState([])
  const [order, setOrder] = useState([])

  const loadImage = (e) => {
    const image = e.target.files[0];
    setSilpImage(image)
    setPreview(URL.createObjectURL(image))
  }

  useEffect(()=> {
    const getPaymentById = async () => {
      try {
        const response = await axios.get(`https://dark-erin-gharial-ring.cyclic.app/api/payments/${id}`)
        setPayStatus(response.data.payment_status)
        setBank(response.data.bank)
        setDatePay(response.data.date_pay)
        setTotal(response.data.total)
        setPaymentId(response.data.id)
        setSilpImage(response.data.slipImage)
        setPreview(response.data.slipURL)
        setProduct(response.data.product)
        setCategory(response.data.category)
        setProimage(response.data.product.ProImage)
        setPreviewProduct(response.data.product.ProURL)
        setOrder(response.data.order)
        console.log(response.data)
      } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg);
        }
      }
    }
    getPaymentById();
  },[id])

  const updateStatus = async(e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://dark-erin-gharial-ring.cyclic.app/api/paymentstatus/${id}`,{
        payment_status: payment_status
      })
      .then((res) => {
        toast.success("อัพเดตสถานะสำเร็จ")
        navigate("/pays")
        console.log(res)
      })
      .catch((err) => {
        toast.error("การอัพเดตสถานะผิดพลาด")
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
        navigate('/pays')
      }
     
    } catch (error) {
      console.log(error);
      toast.error('ไม่สามารถยกเลิกได้')
    }
   }
  return (
    <div>
        <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
          รายละเอียดการชำระเงิน
       
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/pays" underline="hover">
          &#9666; กลับ
        </a>
        <a href="/pays" underline="hover">
        รายการแจ้งชำระเงิน
        </a>
        <Breadcrumb.Item active className="text-color">รายละเอียดการชำระเงิน</Breadcrumb.Item>
      </Breadcrumbs>

      <div className="headerOrder text-color">
        <div className="flex-order">
            <p className='text-color is-size-5 text-header'>รายการแจ้งชำระเงิน {paymentid}</p>
        <div className="confirm-order">
        <form className='text-color'>
        <label>ตรวจสอบการชำระเงิน: &nbsp;</label>

        <select 
value={payment_status}
onChange={(e) => setPayStatus(e.target.value)}
className='inp-style-status' required>
<option selected>รอการตรวจสอบ</option>
<option value="ยังไม่ชำระเงิน">ยังไม่ชำระเงิน</option>
<option value="ชำระเงินแล้ว">ชำระเงินแล้ว</option>
</select>

<button type="submit" onClick={handleCancel} className="btn-cancel-order">
                ยกเลิก
              </button>
                <button type="submit" onClick={updateStatus} className='btn-save-order'>บันทึก</button>
              </form>
        </div>
        </div>
        
      </div>

      <div className="orderDetail text-color flex">
        <div className="flex-orderdetail">
            
        <img src={preview} className='picPaydetail' />
        <p className='text-paydetail'><b>ธนาคาร:</b> {bank} <br />
            <b>วันที่:</b> {date_pay} <br />
            <b>จำนวนเงิน:</b> {total} บาท
        </p>

        </div>

    <div className="orderProduct">
      <p className='text-product'>รายการสินค้าที่สั่งซื้อ</p> 
      <div className="flex">
        <img src={previewproduct} className='picOrderdetail' />
        <div className="flex-orderdetail">
           <div className="text-width">

        <p className='text-detail' >
          <b>หมวดหมู่:</b> {category.CatName} <br />
          <b>ชื่อสินค้า:</b> {product.ProName} <br />
          <b>รายละเอียดสินค้า:</b> {product.ProDes}<br />
        </p>
      
      </div>
      <div className="text-width">

        <p className='text-detail' >
        <b>ขนาดสินค้า:</b> {product.ProSize} <br />
          <b>ราคาสินค้า/หน่วย:</b>  {product.ProPrice} บาท <br />
          <b>จำนวนที่สั่ง:</b>  {order.order_amount} {product.ProUnit}
        </p>
      
      </div>
        </div>
     
      </div>
      <hr className='hr-detail' />
      
      <div className="summary-detail">
        <p><span className='has-text-weight-semibold '>ราคารวมสุทธิ:</span> {product.ProPrice*order.order_amount} บาท</p>
    </div>
    </div>

        
    </div>
    </div>
  )
}

export default PayDetail
