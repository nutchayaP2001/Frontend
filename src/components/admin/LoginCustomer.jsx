import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginCus, reset } from "../features/authSlice";
import Pic from "../asset/img/camera.jpg"

const LoginCustomer = () => {
  const [CusUsername, setCusUsername] = useState("");
  const [CusPass, setCusPass] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cus, isError, isSuccess, isLoading, message } = useSelector(
      (state) => state.auth
    );
  
    useEffect(() => {
      if (cus || isSuccess) {
        navigate("/welcome");
      }
      dispatch(reset());
    }, [cus, isSuccess, dispatch, navigate]);
  
    const AuthCustomer = (e) => {
      e.preventDefault();
      dispatch(LoginCus({ CusUsername, CusPass }));
    };
  
    return (
      <section className="hero bg is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="is-centered">
              <img src="" alt="" />
              <div className="is-4">
                {/* <img src={Logo} alt="โลโก้ร้านเบสท์โฟโต้" className="img" /> */}
  
                <form onSubmit={AuthCustomer} className="flex-login">
                 
  
                  <div className="pic">
                    <img src={Pic} alt="" className="piccamera" />
                  </div>
                  <div className="form-content">
                     <h3 className="text-color has-text-centered text-size mb-5">
                    เข้าสู่ระบบ
                  </h3>
                  {isError && <p className="has-text-centered text-color mt-3">{message}</p>}
  
  <div className="input-group">
    <input type="text" className="inp-style"
      value={CusUsername}
      onChange={(e) => setCusUsername(e.target.value)}
      required/>
    <label className="label-inp">ชื่อผู้ใช้</label>
  </div>
  <div className="input-group">
    <input type="password" className="inp-style"
      value={CusPass}
      onChange={(e) => setCusPass(e.target.value)}
      required/>
    <label className="label-inp">รหัสผ่าน</label>
  </div>
  
  
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="login-btn is-rounded is-fullwidth"
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
  };

export default LoginCustomer