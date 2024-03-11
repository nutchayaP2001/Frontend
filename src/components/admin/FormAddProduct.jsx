import { Breadcrumbs } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { IoPeople } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
// import FileUpload from "./FileUpload";
const initialstate = {
  category: [],
  categoryId: "",
};
const FormAddProduct = () => {
  const [values, setValues] = useState(initialstate);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [ProName, setProname] = useState('')
  const [ProSize, setProsize] = useState('')
  const [ProDes, setProdes] = useState('')
  const [ProQuantity, setProquantity] = useState('')
  const [ProPrice, setProprice] = useState('')
  const [ProUnit, setProunit] = useState('')
  const [ProImage, setProimage] = useState([])
  const [preview, setPreview] = useState("");
  const [categoryId, setCategoryId] = useState([])


  const loadImage = (e) => {
    const image = e.target.files[0];
    setProimage(image);
    setPreview(URL.createObjectURL(image));

  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get("http://localhost:3000/api/category")
      .then((res) => {
        setValues({ ...values, category: res.data });

      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("values", values);

  // const handleChange = (e) => {
  
  //   setValues({ ...values, [e.target.name]: e.target.value });

  //   // console.log(values)
  // };

  // const createProduct = async (value) => {
  //   await axios.post("http://localhost:3000/products", value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
      formData.append("ProName", ProName);
      formData.append("ProSize", ProSize);
      formData.append("ProDes", ProDes);
      formData.append("ProPrice", ProPrice);
      formData.append("ProQuantity", ProQuantity);
      formData.append("ProUnit", ProUnit);
      formData.append("ProImage", ProImage);
      formData.append("categoryId", categoryId);
    try {
      await axios.post("http://localhost:3000/api/products",formData,{
        headers: {
          "Content-type": "multipart/form-data",
        }
      })
      .then((res) => {
        console.log(res);
        toast.success("บันทึกรายการสำเร็จ");
        navigate('/products')
      })
      .catch((err) => {
        console.log(err);
      //  window.location.reload();
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }

  };

   const handleCancel = () => {
    try {
      if(window.confirm('คุณต้องการยกเลิกการเพิ่มรายการสินค้าใช่หรือไม่ ?')){
        toast.success('ยกเลิกการเพิ่มรายการสินค้าสำเร็จ')
        navigate('/products')
      }
     
    } catch (error) {
      console.log(error);
      toast.error('ไม่สามารถยกเลิกการเพิ่มรายการสินค้าได้')
    }
   }

  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold text-color has-text-centered">
       เพิ่มรายการสินค้า
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/products" underline="hover">
          &#9666; กลับ
        </a>
        <a href="/products" underline="hover">
        รายการสินค้า
        </a>
        <Breadcrumb.Item active className="text-color">เพิ่มรายการสินค้า</Breadcrumb.Item>
      </Breadcrumbs>
      <form
        className="userform"
        // onSubmit={handleSubmit}
        // encType="multipart/form-data"
      >
        <div className="flexform">
          <div className="input-group-user" aria-disabled>
            <select
              className="inp-product text-color"
              //  required
              // name="categoryId"
              // onChange={handleChange}
              // value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="หมวดหมู่สินค้า" selected>
                หมวดหมู่สินค้า
              </option>
              {values.category.length > 0 &&
                values.category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.CatName}
                  </option>
                ))}
            </select>

            <label className="label-inp">หมวดหมู่สินค้า<span className="red">*</span></label>
          </div>
          <div className="input-group-user ml-4">
            <input
              type="text"
              className="inp-style-product"
              required
              // name="ProName"
              value={ProName}
              // onChange={handleChange}
              onChange={(e) => setProname(e.target.value)}

            />

            <label className="label-inp">ชื่อสินค้า<span className="red">*</span></label>
          </div>

          <div className="input-group-user">
            <input
              type="text"
              className="inp-style-product"
              required
              // name="ProDes"
              value={ProDes}
              // onChange={handleChange}
              onChange={(e) => setProdes(e.target.value)}

            />

            <label className="label-inp">รายละเอียดสินค้า<span className="red">*</span></label>
          </div>

          <div className="input-group-user ml-4">
            <input
              type="text"
              className="inp-style-product"
              required
              // name="ProSize"
              value={ProSize}
              // onChange={handleChange}
              onChange={(e) => setProsize(e.target.value)}

            />

            <label className="label-inp">ขนาดสินค้า (in/cm/mm)<span className="red">*</span></label>
          </div>

          <div className="input-group-user">
            <input
              type="number"
              className="inp-style-product"
              required
              // name="ProPrice"
              value={ProPrice}
              // onChange={handleChange}
              onChange={(e) => setProprice(e.target.value)}

              min="0"
            />

            <label className="label-inp">ราคาสินค้า/หน่วย (บาท)<span className="red">*</span></label>
          </div>

          <div className="input-group-user ml-4">
            <input
              type="number"
              className="inp-style-quantity"
              required
              // name="ProQuantity"
              value={ProQuantity}
              // onChange={handleChange}
              onChange={(e) => setProquantity(e.target.value)}

            />

            <label className="label-inp">จำนวน<span className="red">*</span></label>
          </div>
          <div className="input-group-user ml-4">
            <input
              type="text"
              className="inp-style-quantity "
              required
              // name="ProQuantity"
              value={ProUnit}
              // onChange={handleChange}
              onChange={(e) => setProunit(e.target.value)}

            />

            <label className="label-inp">หน่วย<span className="red">*</span></label>
          </div>

          {/* <FileUpload/> */}
    
          <div className="input-group-user">
          <label className="mr-2 text-color">เพิ่มรูปภาพ <span className="red">*</span></label>

            <input
              onChange={loadImage}
              type="file"
            />


          </div>
          {preview ? (
<div className="borderimg">
  <img src={preview} alt="ภาพสินค้า" className='brimgFrame'  />
 </div>
   ) : (
    ""
  )}
        </div>

                               
         

          <div className="btns">
           <button type="submit" onClick={handleCancel} className='btnD'>
             ยกเลิก
             </button>
    {/* <button type="reset" className="btn">ล้างข้อมูล</button> */}
    <button type="submit" onClick={handleSubmit} className="btnS"> บันทึก</button>
        </div>
      </form>
    </div>
  );
};

export default FormAddProduct;
