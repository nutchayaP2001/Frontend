import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from "../../asset/img/LogoBestPhoto.png";
import { LoginUser, reset } from '../../features/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const [userEmail, setuserEmail] = useState("");
    const [userPass, setuserPass] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
      (state) => state.auth
    );
  
    useEffect(() => {
      if (user || isSuccess) {
        navigate("/home");
        toast.success(`เข้าสู่ระบบด้วยบัญชี ${userEmail}`, {
          theme: "colored"
        })
      }
        
      dispatch(reset());
    
      
    }, [user, isSuccess, dispatch, navigate]);
  
    const Auth = (e) => {
      e.preventDefault()
    
        dispatch(LoginUser({ userEmail, userPass}))

    };

  return (
    <section className="hero bg is-fullheight is-fullwidth">
    <div className="hero-body">
      <div className="container">
        <div className="is-centered">
          <div className="is-4">
            {/* <img src={Logo} alt="โลโก้ร้านเบสท์โฟโต้" className="img" /> */}

            <form onSubmit={Auth} className="flex-login">
             

              {/* <div className="pic">
                <img src={Pic} alt="" className="piccamera" />
              </div> */}
              
              <div className="form-content">
                <h2>Hiii</h2>
              <div className="img">
                <img src={Logo} alt="" width={100} />
{/* <h3 className="text-color has-text-centered text-size mb-5">
                เข้าสู่ระบบ
              </h3> */}
                </div>
                 
              {isError && <p className="has-text-centered text-color mt-3">{message}</p>}
             
<div className="input-group">
<input type="text" className="inp-style-login"
  value={userEmail}
  onChange={(e) => setuserEmail(e.target.value)}
  required/>
<label className="label-inp">ชื่อผู้ใช้</label>
</div>
<div className="input-group">
<input type="password" className="inp-style-login"
  value={userPass}
  onChange={(e) => setuserPass(e.target.value)}
  required/>
<label className="label-inp">รหัสผ่าน</label>
</div>


              <div className="field">
                <button
                  type="submit"
                  className="login-btn"
                >
                  {isLoading ? "Loading..." : "เข้าสู่ระบบ"}
                </button>
              </div>
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Login