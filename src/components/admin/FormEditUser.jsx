import React, { useState, useEffect } from 'react';
import axios from "axios";
import {  useParams, useNavigate, Link } from "react-router-dom";
import { IoPeople } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@mui/material';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const FormEditUser = () => {
  const [userFname, setUserfname] = useState("");
  const [userLname, setUserlname] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [userPass, setUserpass] = useState("");
  const [userconfPass, setUserconfpass] = useState("");
  const [userHouseNo, setUserhouseno] = useState("");
  const [userMoo, setUsermoo] = useState("");
  const [userPlace, setUserplace] = useState("");
  const [userDistrict, setUserdistrict] = useState("");
  const [userProvince, setUserprovince] = useState("");
  const [userZipcode, setUserzipcode] = useState("");
  const [userTel, setUsertel] = useState("");
  const [userRole, setUserrole] = useState("");
  const [msg, setMsg] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3000/api/users");
    setUsers(response.data);
  };


  useEffect(()=>{
    const getUserById = async () => {
     try {
       const response = await axios.get(`http://localhost:3000/api/users/${id}`);
     setUserfname(response.data.userFname);
     setUserlname(response.data.userLname);
     setUseremail(response.data.userEmail);
     setUserhouseno(response.data.userHouseNo);
     setUsermoo(response.data.userMoo);
     setUserplace(response.data.userPlace);
     setUserdistrict(response.data.userDistrict);
     setUserprovince(response.data.userProvince);
     setUserzipcode(response.data.userZipcode);
     setUsertel(response.data.userTel);
     setUserrole(response.data.userRole);
    //  console.log(response.data)
     } catch (error) {
       if(error.response){
         setMsg(error.response.data.msg);
       }
     }
   }
   getUserById();
 }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/api/users/${id}`, {
        userFname: userFname,
        userLname: userLname,
        userEmail: userEmail,
        userPass: userPass,
        userconfPass: userconfPass,
        userHouseNo: userHouseNo,
        userMoo: userMoo,
        userPlace: userPlace,
        userDistrict: userDistrict,
        userProvince: userProvince,
        userZipcode: userZipcode,
        userTel: userTel,
        userRole: userRole
      }).then(res => {
        toast.success("แก้ไขสำเร็จ")
        navigate("/users");
      }).catch((err => {
        console.log(err)
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน")
      }))
      
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
        navigate('/users')
      }
     
    } catch (error) {
      console.log(error);
      toast.error('ไม่สามารถยกเลิกได้')
    }
   }

  return (
    <div>
     <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
      แก้ไขผู้ใช้งานระบบ
        
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/users" underline="hover">
          &#9666; กลับ
        </a>
        <a href="/users" underline="hover">
        ผู้ใช้งานระบบ
        </a>
        <Breadcrumb.Item active className="text-color">แก้ไขผู้ใช้งานระบบ</Breadcrumb.Item>
      </Breadcrumbs>

      <form className="userform">
                <p className="has-text-centered text-color">{msg}</p>
                <p className="has-text-weight-semibold is-size-5 text-color">
                ข้อมูลผู้ใช้
              </p>
                  <div className="flex">
                  <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userFname}
                        onChange={(e) => setUserfname(e.target.value)}
                        required
                      />
                      <label className="label-inp">
                          ชื่อจริง<span className="red">*</span>
                        </label>
                    </div>
                    <div className="input-group-user ml-4">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userLname}
                        onChange={(e) => setUserlname(e.target.value)}
                        required
                      />
                      <label className="label-inp">นามสกุล<span className="red">*</span>
                      </label>
                    </div>

                    <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userEmail}
                    onChange={(e) => setUseremail(e.target.value)}
                        required
                      />
                       <label className="label-inp">ชื่อผู้ใช้<span className="red">*</span>
                       </label>
                    </div>

                    <div className="input-group-user ml-4" aria-disabled>
                      <input
                        type="password"
                        className="inp-style-user-nobg"
                        value={userPass}
                        
                        // onChange={(e) => setUserpass(e.target.value)}
                        disabled
                        required
                      />
                       <label className="label-inp">รหัสผ่าน<span className="red">*</span>
                       </label>
                    </div>
                    <div className="input-group-user" aria-disabled>
                      <input
                        type="password"
                        className="inp-style-user-nobg"
                        value={userconfPass}
                        // onChange={(e) => setUserconfpass(e.target.value)}
                        disabled
                        required
                      />
                       <label className="label-inp">ยืนยันรหัสผ่าน<span className="red">*</span>
                       </label>
                    </div>
                  </div>

                    <p className="has-text-weight-semibold is-size-5 text-color mt-5">
                ข้อมูลที่อยู่
              </p>
              <div className="flex">
              <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userHouseNo}
                    onChange={(e) => setUserhouseno(e.target.value)}
                        required
                      />
                       <label className="label-inp">บ้านเลขที่<span className="red">*</span>
                       </label>
                    </div>
                    <div className="input-group-user ml-4">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userMoo}
                        onChange={(e) => setUsermoo(e.target.value)}
                        required
                      />
                       <label className="label-inp">หมู่ที่<span className="red">*</span>
                       </label>
                    </div>
                    <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userProvince}
                    onChange={(e) => setUserprovince(e.target.value)}
                        required
                      />
                       <label className="label-inp">จังหวัด<span className="red">*</span>
                       </label>
                    </div>

                    <div className="input-group-user ml-4">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userDistrict}
                    onChange={(e) => setUserdistrict(e.target.value)}
                        required
                      />
                       <label className="label-inp">อำเภอ<span className="red">*</span>
                       </label>
                    </div>

                    <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userPlace}
                    onChange={(e) => setUserplace(e.target.value)}
                        required
                      />
                       <label className="label-inp">ตำบล<span className="red">*</span>
                       </label>
                    </div>
                    
                  
                    <div className="input-group-user ml-4">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userZipcode}
                    onChange={(e) => setUserzipcode(e.target.value)}
                        required
                      />
                       <label className="label-inp">รหัสไปรษณีย์<span className="red">*</span>
                       </label>
                    </div><div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        value={userTel}
                    onChange={(e) => setUsertel(e.target.value)}
                        // placeholder="สี"
                        autoComplete="off"
                        required
                      />
                       <label className="label-inp">เบอร์โทร<span className="red">*</span>
                       </label>
                    </div>
                    <div className="input-group-user ml-4" aria-disabled >
                    {/* <label>ตำแหน่ง
                       </label> */}
                       <input
                        type="text"
                        className="inp-style-user-nobg"
                        value={userRole}
                    // onChange={(e) => setUsertel(e.target.value)}
                        // placeholder="สี"
                        // autoComplete="off"
                        required
                      />
                       <label className="label-inp">ตำแหน่ง<span className="red">*</span>
                       </label>
                    {/* <select
                      value={userRole}
                      onChange={(e) => setUserrole(e.target.value)}
                      required
                      
                      className="inp-style-user"
                    >
                      <option selected disabled>ตำแหน่ง</option>
                      <option value="admin" disabled >Admin</option>
                      <option value="staff" disabled>Staff</option>
                    </select>
                    <label className="label-inp">ตำแหน่ง<span className="red">*</span>
                       </label> */}
                     
                   </div>
                
              </div>
              
                
              <div className="btns">
              <button onClick={handleCancel} className='btnD'>
             ยกเลิก
             </button>
             <button type="submit" 
                  //  to="/users"
                  onClick={updateUser}
                   className="btnS" >บันทึก
                </button>
                   </div>
              </form>

       
    </div>
  );
};
export default FormEditUser;
