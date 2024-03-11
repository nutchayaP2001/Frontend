import React, { useState } from 'react';
import './Dropdown.css';
import  {dropMenu} from './data.js'
import { dropMenuAdmin } from './dataAdmin.js';
import { IoIosArrowDown } from "react-icons/io";
import Logo from '../../../asset/img/LogoBestPhoto.png'
import SubMenu from './SubMenu/SubMenu.jsx';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut, reset } from '../../../features/authSlice.js';
import { AiOutlineLogout } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Dropdown = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  
    const logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
      toast.success('ออกจากระบบ',{
        theme: 'colored'
      })
    };
  return (
    <header className='header'>
      <div className="wrapper">
      <div className='imgLogo'>
        <a href="/home"><img src={Logo} alt="" /></a>
        </div>
        <div className={`shadow ${openMenu && "active"}`} onClick={() => setOpenMenu(false)}/>
        <ul className={`navigation ${openMenu && "active"}`}>
          <span className='close_menu' onClick={() => setOpenMenu(false)}><FaTimes/></span>
          {dropMenu.map((menu,i) => (
            <li key={i} className='list_menu'>
                <div className="nav_menu">
                <a href={menu.path}>{menu.title}</a> 
                {menu.subMenu && (
                  <span className='menu_icon'><IoIosArrowDown/></span>
                )}
                </div>
                {menu.subMenu && (
                  <div className="sub_menu">
                    <SubMenu menu={menu}/>
                  </div>
                )}
            </li>
          ))}
          
          {user && user.userRole === "แอดมิน" && dropMenuAdmin.map((menuAd,i) => (
          <li key={i} className='list_menu'>
                <div className="nav_menu">
                <a href={menuAd.path}>{menuAd.title}</a> 
                {menuAd.subMenu && (
                  <span className='menu_icon'><IoIosArrowDown/></span>
                )}
                </div>
                {menuAd.subMenu && (
                  <div className="sub_menu">
                    <SubMenu menu={menuAd}/>
                  </div>
                )}
            </li>
        ))}
         <li className="nav-links">ยินดีต้อนรับ <b>{user && user.userEmail},</b> {user && user.userRole}</li>

         <a className='btnLogout' onClick={logout}><span className="icon"><AiOutlineLogout/></span> <span className="text">ออกจากระบบ</span></a>  
        </ul>
       
      
        <span className="bar_menu" onClick={()=>setOpenMenu(true)}>
          <FaBars/>
        </span>
      </div>
    </header>
  )
}

export default Dropdown;