import { Breadcrumbs } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
const ProductDamageDetail = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [date_pickupProduct, setPickupProduct] = useState("");
  const [description, setDescription] = useState("");
  const [damageImage, setDamageImage] = useState("");
  const [admin_note, setAdminNote] = useState("");
  const [category, setCategory] = useState("");
  const [customer, setCustomer] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  const loadImage = (e) => {
    const image = e.target.files[0];
    setDamageImage(image);
    setPreview(URL.createObjectURL(image));
  };

  useEffect(() => {
    const getDamageById = async () => {
      try {
        const response = await axios.get(
          `https://dark-erin-gharial-ring.cyclic.app/api/productdamages/${id}`
        );
        setStatus(response.data.status);
        setPickupProduct(response.data.date_pickupProduct);
        setDescription(response.data.description);
        setAdminNote(response.data.admin_note);
        setCategory(response.data.category.CatName);
        setCustomer(response.data.customer.CusUsername);
        setDamageImage(response.data.damageImage);
        setPreview(response.data.damageURL);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    getDamageById();
  }, [id]);

  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`https://dark-erin-gharial-ring.cyclic.app/api/productdamages/${id}`, {
          status: status,
          admin_note: admin_note,
        })
        .then((res) => {
          toast.success("อัพเดตสถานะสำเร็จ");
          navigate("/productdamages");
          console.log(res);
        })
        .catch((err) => {
          toast.error("การอัพเดตสถานะผิดพลาด");
          console.log(err);
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleCancel = () => {
    try {
      if(window.confirm('คุณต้องการยกเลิกใช่หรือไม่ ?')){
        toast.success('ยกเลิกสำเร็จ')
        navigate('/productdamages')
      }
     
    } catch (error) {
      console.log(error);
      toast.error('ไม่สามารถยกเลิกได้')
    }
   }
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
        รายละเอียดสินค้าชำรุด
      </h1>

      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/productdamages" underline="hover">
          &#9666; กลับ
        </a>
        <a href="/productdamages" underline="hover">
        รายการสินค้าชำรุด
        </a>
        <Breadcrumb.Item active className="text-color">รายละเอียดสินค้าชำรุด</Breadcrumb.Item>
      </Breadcrumbs>

      <form className="text-color">
        <div className="headerOrder text-color">
          <div className="flex-order">
            <p className="text-color is-size-5 text-header">รายการแจ้งสินค้าชำรุด {id}</p>

            <div className="confirm-order">
              <label>จัดการการดำเนินการแก้ไข: &nbsp;</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="inp-style-status"
                required
              >
                <option selected>รอดำเนินการ</option>
                {/* <option value="ยังไม่ชำระเงิน">ยังไม่ดำเนินการ</option>   */}
                <option value="ดำเนินการแก้ไขแล้ว">ดำเนินการแก้ไขแล้ว</option>
              </select>
              <button type="submit" onClick={handleCancel} className="btn-cancel-order">
                ยกเลิก
              </button>
              <button type="submit" className="btn-save-order" onClick={updateStatus}>
                บันทึก
              </button>
             
            </div>
          </div>
        </div>

        <div className="orderDetail text-color flex">
          <div className="flex-orderdetail">
            <img src={preview} className="picPaydetail" />
            <p className="text-paydetail">
            <b>ชื่อลูกค้า: </b> {customer} <br />
              <b>สินค้า:</b> {category} <br />
              <b>วันที่รับสินค้า:</b> {date_pickupProduct} <br />
              <b>รายละเอียด:</b> {description} <br />
            </p>
          </div>

          <div className="input-group-user text-area">
            <textarea
              className="inp-style-user"
              value={admin_note}
              onChange={(e) => setAdminNote(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <label className="label-inp">หมายเหตุการแก้ไข: </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDamageDetail;
