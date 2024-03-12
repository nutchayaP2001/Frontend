import { Breadcrumbs, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { IoPeople } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { useForm } from 'react-hook-form';
import { values } from 'lodash';

// const initialstate = {
//     ProName: "",
//     ProSize: "",
//     ProDes: "",
//     ProQuantity: "",
//     ProPrice: "",
//     ProImage: [],
//     category: [],
//     categoryId: "",
//   };
function FormEditProduct() {
//   const [values, setValues] = useState(initialstate);
//   const [data, setData] = useState();
  const [category,setCategory] = useState([])
  const [ProName, setProname] = useState('')
  const [ProSize, setProsize] = useState('')
  const [ProDes, setProdes] = useState('')
  const [ProQuantity, setProquantity] = useState('')
  const [ProUnit, setProunit] = useState('')
  const [ProPrice, setProprice] = useState('')
  const [ProImage, setProimage] = useState("")
  const [preview, setPreview] = useState("");
  const [categoryId, setCategoryId] = useState([])
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: {errors}} = useForm();


  const loadImage = (e) => {
    const image = e.target.files[0];
    setProimage(image);
    setPreview(URL.createObjectURL(image));

  }

useEffect(() => {
    const loadData = async () => {
        try {
            const response = await axios.get(`https://dark-erin-gharial-ring.cyclic.app/api/product/${id}`);
            setCategoryId(response.data.categoryId)
            setProname(response.data.ProName)
            setProdes(response.data.ProDes)
            setProprice(response.data.ProPrice)
            setProquantity(response.data.ProQuantity)
            setProunit(response.data.ProUnit)
            setProsize(response.data.ProSize)
            setProimage(response.data.ProImage)
            setPreview(response.data.ProURL)
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
              }
        }
            // เรียก List Category
    await axios.get('https://dark-erin-gharial-ring.cyclic.app/api/category')
    .then((res) => {
       setCategory(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
    }
    loadData();
},[id]);

// const loadData = async (id) => {
//     await axios.get(`http://localhost:3000/product/${id}`)
//     .then((res) => {
//         // setValues({...values, ...res.data})
//         setCategory(res.data.CatName)
//         setProname(res.data.ProName)
//         setProdes(res.data.ProDes)
//         setProprice(res.data.ProPrice)
//         setProquantity(res.data.ProQuantity)
//         setProsize(res.data.ProSize)
//         setProimage(res.data.ProImage)
//         setPreview(res.data.ProURL)

//     })
//     .catch((err) => {
//         console.log(err)
//     })
//     // เรียก List Category
//     await axios.get('http://localhost:3000/category')
//     .then((res) => {
//        setCategory(res.data)
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// }

// const EditProduct = async (id,product) => {
//     await axios.patch('http://localhost:3000/products/' + id,product)
// }

// const handleChange = (e) => {
//     setValues({...values, [e.target.name]: e.target.value})
// }

const saveProduct = async () => {
  // setLoading(true)
    // e.preventDefault();
    const formData = new FormData();
    formData.append("ProName", ProName);
    formData.append("ProDes", ProDes);
    formData.append("ProSize", ProSize);
    formData.append("ProPrice", ProPrice);
    formData.append("ProQuantity", ProQuantity);
    formData.append("ProUnit", ProUnit);
    formData.append("ProImage", ProImage);
    formData.append("categoryId", categoryId);
    try {
        await axios.patch(`https://dark-erin-gharial-ring.cyclic.app/api/products/${id}`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        })
        .then((res) => {
          // setLoading(false)
          console.log(res)
          toast.success("แก้ไขข้อมูลเรียบร้อย")
        navigate("/products")

        })
        .catch((err) => {
          // setLoading(false)
          console.log(err)
          toast.error("แก้ไขข้อมูลไม่ได้")
        })
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
          }
    }
  };

  const handleCancel = (e) => {
    try {
      if(window.confirm('คุณต้องการยกเลิกการแก้ไขรายการสินค้าใช่หรือไม่ ?')){
        toast.success('ยกเลิกการแก้ไขรายการสินค้าสำเร็จ')
      navigate('/products')
      }
      
    } catch (error) {
      console.log(error);
      toast.error('ไม่สามารถยกเลิกการแก้ไขรายการสินค้าได้')
    }
   }

// console.log("product", values)
// console.log("Cate", category)

  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold text-color has-text-centered">
        <span className="">
          {/* <IoPeople /> */}
          {/* &nbsp;  */}
          แก้ไขรายการสินค้า
        </span>
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/products" underline="hover">
          &#9666; กลับ
        </a>
        <a href="/products" underline="hover">
        รายการสินค้า
        </a>
        <Breadcrumb.Item active className="text-color">แก้ไขรายการสินค้า</Breadcrumb.Item>
      </Breadcrumbs>

       
<div  className="userform" >
      <form
        onSubmit={handleSubmit(saveProduct)}
        // encType="multipart/form-data"
      >
        <div className="flex">
          <div className="input-group-user">
            <select
              className="inp-product"
              //  required
              // name="categoryId"
            //   onChange={handleChange}
              // {...register('category', {required: 'กรุณาเลือกหมวดหมู่สินค้า'})}
              value={categoryId}

              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="" selected>
                หมวดหมู่สินค้า
              </option> 
              {
              category.length > 0 &&
                category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.CatName}
                  </option>
                ))
                }
            </select>
          
            <label className="label-inp">หมวดหมู่สินค้า<span className="red">*</span></label>
            {/* <div>
              {errors.category && (
                <span className="text-alert ">
                  {errors.category.message}
                </span>
              )}
            </div> */}
          </div>
          <div className="input-group-user ml-4">
            <input
              type="text"
              className="inp-style-product"
              required
              // name="ProName"
              value={ProName}
            //   onChange={handleChange}
              // {...register('Proname', {required: 'กรุณาระบุชื่อสินค้า'})}
              onChange={(e) => setProname(e.target.value)}

            />

            <label className="label-inp">ชื่อสินค้า<span className="red">*</span></label>
            {/* <div>
              {errors.Proname && (
                <span className="text-alert ">
                  {errors.Proname.message}
                </span>
              )}
            </div> */}
          </div>

          <div className="input-group-user">
            <input
              type="text"
              className="inp-style-product"
              required
              // name="ProDes"
              value={ProDes}
            //   onChange={handleChange}
              // {...register('ProDes', {required: 'กรุณาระบุรายละเอียดสินค้า'})}
              onChange={(e) => setProdes(e.target.value)}

            />

            <label className="label-inp">รายละเอียดสินค้า<span className="red">*</span></label>
            {/* <div>
              {errors.ProDes && (
                <span className="text-alert ">
                  {errors.ProDes.message}
                </span>
              )}
            </div> */}
          </div>

          <div className="input-group-user ml-4">
            <input
              type="text"
              className="inp-style-product"
              required
              // name="ProSize"
              value={ProSize}
            //   onChange={handleChange}
              // {...register('ProSize', {required: 'กรุณาระบุขนาดสินค้า'})}
              onChange={(e) => setProsize(e.target.value)}

            />

            <label className="label-inp">ขนาดสินค้า (in/cm/mm)<span className="red">*</span></label>
            {/* <div>
              {errors.ProSize && (
                <span className="text-alert ">
                  {errors.ProSize.message}
                </span>
              )}
            </div> */}
          </div>

          <div className="input-group-user">
            <input
              type="number"
              className="inp-style-product"
              required
              // name="ProPrice"
              value={ProPrice}
            //   onChange={handleChange}
              // {...register('ProPrice', {required: 'กรุณาระบุราคาสินค้า/หน่วย'})}
              onChange={(e) => setProprice(e.target.value)}

              min="0"
            />

            <label className="label-inp">ราคาสินค้า/หน่วย (บาท)<span className="red">*</span></label>
            {/* <div>
              {errors.ProPrice && (
                <span className="text-alert ">
                  {errors.ProPrice.message}
                </span>
              )}
            </div> */}
          </div>

          <div className="input-group-user ml-4">
            <input
              type="number"
              className="inp-style-quantity"
              required
              // name="ProQuantity"
              value={ProQuantity}
            //   onChange={handleChange}
              // {...register('ProQuantity', {required: 'กรุณาระบุจำนวนสินค้า'})}
              onChange={(e) => setProquantity(e.target.value)}

            />

            <label className="label-inp">จำนวน<span className="red">*</span></label>
            {/* <div>
              {errors.ProQuantity && (
                <span className="text-alert ">
                  {errors.ProQuantity.message}
                </span>
              )}
            </div> */}
          </div>

          <div className="input-group-user ml-4">
            <input
              type="text"
              className="inp-style-quantity "
              required
              // name="ProQuantity"
              value={ProUnit}
              // onChange={handleChange}
              // {...register('ProUnit', {required: 'กรุณาระบุหน่วยของสินค้า'})}
              onChange={(e) => setProunit(e.target.value)}

            />

            <label className="label-inp">หน่วย<span className="red">*</span></label>
            {/* <div>
              {errors.ProUnit && (
                <span className="text-alert ">
                  {errors.ProUnit.message}
                </span>
              )}
            </div> */}
          </div>

          {/* <FileUpload/> */}
                 
          <div className="input-group-user">
          <label className="mr-2 text-color">เพิ่มรูปภาพ<span className="red">*</span></label>

            <input
              type="file"
              onChange={loadImage}
              // value={ProImage}
            />
          </div>

          {preview ? (
<div className="borderimg ml-3">
  <img src={preview} alt="ภาพสินค้า" className='brimgFrame'  />
 </div>
   ) : (
    ""
  )}
        </div>

  
             <div className="btns">
             <button type='submit' onClick={handleCancel} className='btnD'>
             ยกเลิก
             </button>
    <button type="submit" className="btnS"> บันทึก</button>
          
        </div>
      </form>
     
      </div>
   
    </div>
  );
}

export default FormEditProduct
