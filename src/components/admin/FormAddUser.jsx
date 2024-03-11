import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../css/Style.css";
import { IoPeople } from "react-icons/io5";
import {BsFillPlayFill} from 'react-icons/bs'
import { toast } from "react-toastify";
import { Breadcrumbs } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const FormAddUser = () => {
  const [userPlace, setUserplace] = useState([]);
  const [userDistrict, setUserdistrict] = useState([]);
  const [userProvince, setUserprovince] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [data, setData] = useState({
    userFname: '',
    userLname: '',
    userEmail: '',
    userPass: '',
    userconfPass: '',
    userHouseNo: '',
    userMoo: '',
    userPlace: '',
    userDistrict: '',
    userProvince: '',
    userZipcode: '',
    userTel: '',
    userRole: ''
  })

  const handlePassWordChang = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);


    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordPattern.test(newPassword)){
      setPasswordError('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และมีตัวอักษรอย่างน้อย 1 ตัว และตัวเลข 1 ตัว');
    }else{
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChang = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if(newConfirmPassword !== data.userPass){
      setPasswordError('รหัสผ่านไม่ตรงกัน');
      // toast.error(passwordError);
    }else{
      setPasswordError('');
    }
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const hadelInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsDuplicate(inputEmail.includes(value));
  }


  const createUser = async (data) => {
    await axios.post('http://localhost:3000/api/users',data)

  }

  const saveUser = async (e) => {
    e.preventDefault();
    // if(inputValue && !inputEmail.includes(inputValue)){
    //   setInputEmail([...inputEmail, inputValue]);
    //   setInputValue('');
    //   setIsDuplicate(false);
    // }
    createUser(data)
      .then(res => {
        console.log(res)
        toast.success("บันทึกรายการสำเร็จ")
      navigate("/users");
      }).catch(err => {
        console.log(err);
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน")

      })
  };
  
  useEffect(() => {
    getlistProvince();
  }, []);

  const getlistProvince = async () => {
    await axios.get('http://localhost:3000/api/province')
    .then(res => {
      setUserprovince(res.data)
    // console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }
 
  const getlistDistrict = async (code) => {
   await axios.get(`http://localhost:3000/api/district/${code}`)
   .then(res => {
    setUserdistrict(res.data)
    // console.log(res.data)
   }).catch(err => {
    console.log(err)
   })
  }

  const getlistSubdistrict = async (code) => {
   await axios.get(`http://localhost:3000/api/subdistrict/${code}`)
   .then(res => {
    setUserplace(res.data)
    // console.log(res.data)
   }).catch(err => {
    console.log(err)
   })
  }


// const onSubmit = (e) => {
//   e.preventDefault();
  // createLocation
//   console.log('submit')
// }

  const onChangeData = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const onChangeProvince =  (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text
    setData({...data, [e.target.name]: label})
getlistDistrict(e.target.value)
  }
  const onChangeDistrict =  (e) => {
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text
    setData({...data, [e.target.name]: label})
    getlistSubdistrict(e.target.value)
    // console.log(code)
}
const onChangeSubdistrict =  (e) => {
  const  filterSubdistrict = userPlace.filter(item => {
    return e.target.value = item.code
  })
  console.log(filterSubdistrict[0].name_th)
  console.log(filterSubdistrict[0].zip_code)
  // let index = e.nativeEvent.target.selectedIndex;
  //   let label = e.nativeEvent.target[index].text
    setData({...data, [e.target.name]: filterSubdistrict[0].name_th,
    userZipcode: filterSubdistrict[0].zip_code
    })
}
  console.log(data);
  // console.log(userDistrict);
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold text-color has-text-centered">
        เพิ่มผู้ใช้งานระบบ
      </h1>
      {/* <h1 className="subtitle ml-3 ">เพิ่มพนักงาน</h1> */}
      <div>
      <Breadcrumbs aria-label="breadcrumb" className="text-color mt-3">
        <Link to="/users" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <Link to="/users" underline="hover" className="text-color">
          ผู้ใช้งานระบบ
        </Link>
        <h3 className="text-color">เพิ่มผู้ใช้งานระบบ</h3>
      </Breadcrumbs>
          <form onSubmit={saveUser} className="userform">
                <p className="has-text-centered text-color">{msg}</p>
                <p className="has-text-weight-semibold is-size-5 text-color">
                 ข้อมูลผู้ใช้
              </p>
              <div className="user-input">
                <div className="flex">
                  <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        // value={userFname}
                        name="userFname"
                        onChange={(e) => onChangeData(e)}
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
                        // value={userLname}
                        name="userLname"
                        onChange={(e) => onChangeData(e)}
                        required
                      />
                      <label className="label-inp">นามสกุล<span className="red">*</span>
                      </label>
                    </div>

                    <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        // value={inputValue}
                        name="userEmail"
                    onChange={(e) => onChangeData(e)}
                    // onChange={hadelInputChange}
                        required
                      />
                       <label className="label-inp">ชื่อผู้ใช้<span className="red">*</span>
                       </label>
                       {isDuplicate && <p style={{ color: 'red' }}>ชื่อผู้ใช้นี้มีแล้ว กรุณาลองชื่อผู้ใช้ใหม่</p>}
                       
                    </div>

                    <div className="input-group-user ml-4">
                      <input
                        type= {showPassword ? 'text' : 'password'}
                        className="inp-style-user"
                        // value={password}
                        name="userPass"
                        onChange={(e) => onChangeData(e)}
                        required
                        // onChange={handlePassWordChang}
                      />
                      <div  className="password-toggle" onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</div>
                       <label className="label-inp">รหัสผ่าน<span className="red">*</span>
                       </label>
                    </div>

                    <div className="input-group-user">
                      <input
                        type=  {showConfirmPassword ? 'text' : 'password'}
                        className="inp-style-user"
                        // value={confirmPassword}
                        name="userconfPass"
                        onChange={(e) => onChangeData(e)}
                        // onChange={handleConfirmPasswordChang}
                        required
                        
                      />
                    <div className="password-toggle" onClick={handleToggleConfirmPassword}>{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</div>
                       <label className="label-inp">ยืนยันรหัสผ่าน<span className="red">*</span>
                       </label>
                    </div>
                  </div>

                  {passwordError && <p className="red mt-2 ml-1">{passwordError}</p>}


                    <p className="has-text-weight-semibold is-size-5 text-color mt-5">
                ข้อมูลที่อยู่
              </p>
              <div className="flex">
              <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        // value={userHouseNo}
                        name="userHouseNo"
                    onChange={(e) => onChangeData(e)}
                        required
                      />
                       <label className="label-inp">บ้านเลขที่<span className="red">*</span>
                       </label>
                    </div>
                    <div className="input-group-user ml-4">
                      <input
                        type="text"
                        className="inp-style-user"
                        // value={userMoo}
                        name="userMoo"
                        onChange={(e) => onChangeData(e)}
                        required
                      />
                       <label className="label-inp">หมู่ที่<span className="red">*</span>
                       </label>
                    </div> 

                    <div className="input-group-user">
                     <select name="userProvince" className="inp-user" onChange={(e) => onChangeProvince(e)}>
                      <option value="จังหวัด" selected >จังหวัด</option>
                      {userProvince.map((province,index) => 
                      <option
                      key={index}
                      value={province.code}>
                        {province.name_th}
                      </option>
                      )}
                      
                     </select>
                     <label className="label-inp">จังหวัด<span className="red">*</span>
                       </label>
                    </div>

                    <div className="input-group-user ml-4">
                     <select name="userDistrict" className="inp-user" onChange={(e) => onChangeDistrict(e)} >
                     <option value="อำเภอ" selected >อำเภอ</option>
                        {userDistrict.map((district,index)=>
                        <option key={index} 
                        value={district.code} 
                        >{district.name_th}</option>
                        )}
                     </select>
                     <label className="label-inp">อำเภอ<span className="red">*</span>
                       </label>
                    </div>

                    <div className="input-group-user">
                    <select name="userPlace" className="inp-user" onChange={(e) => onChangeSubdistrict(e)}>
                     <option value="ตำบล" selected >ตำบล</option>
                        {userPlace.map((place,index)=>
                        <option key={index} 
                        value={place.code} 
                        >{place.name_th}</option>
                        )}
                     </select>
                     <label className="label-inp">ตำบล<span className="red">*</span>
                       </label>
                    </div>
                   
                    
                    
                    <div className="input-group-user ml-4">
                      <input
                        type="text"
                        className="inp-style-user"
                        // value={userZipcode}
                    name="userZipcode"
                    value={data.userZipcode}
                    // onChange={(e) => onChangeData(e)}

                        required
                      />
                       <label className="label-inp">รหัสไปรษณีย์<span className="red">*</span>
                       </label>
                    </div>
                    <div className="input-group-user">
                      <input
                        type="text"
                        className="inp-style-user"
                        // value={userTel}
                        name="userTel"
                    onChange={(e) => onChangeData(e)}
                        // autoComplete="off"
                        required
                      />
                       <label className="label-inp">เบอร์โทร<span className="red">*</span>
                       </label>
                    </div>
                    <div className="input-group-user ml-4">
                    
                    <select
                      // value={userRole}
                      name="userRole"
                      onChange={(e) => onChangeData(e)}
                      required
                      className="inp-user"
                    >
                      <option selected>ตำแหน่ง</option>
                      <option value="แอดมิน" >แอดมิน</option>
                      <option value="พนักงาน">พนักงาน</option>
                    </select>
                    <label className="label-inp">ตำแหน่ง<span className="red">*</span>
                       </label>
                   </div>

              </div>
                
              </div>
                  
              <div className="btns">
                   <Link to='/users'className='btnD'>
             ยกเลิก
             </Link>
             <button type="submit" 
                  //  to="/users"
                   className="btnS" >บันทึก
                </button>
                   </div>
              </form>
      </div>
    </div>
  );
};

export default FormAddUser;
