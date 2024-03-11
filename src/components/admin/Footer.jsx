import React from 'react'
import { BsFacebook } from 'react-icons/bs'

const Footer = () => {
  return (
    <div>
      <div className="bgFooter text-color">
        <div className="flex">
            <div className="textfooter">
            <h2>ร้านเบสท์โฟโต้</h2> 
        <p>25 หมู่ 8 ตำบลฟ้าหยาด อำเภอมหาชนะชัย จังหวัดยโสธร 35130</p>
        <div className='link-font'>
            {/* <h3>ติดต่อ</h3> */}
        <a className='text-color' href="https://web.facebook.com/bestphoto.m" target="_blank"><BsFacebook/> เบสท์โฟโต้ มหาชนะชัย</a>
        </div>
            </div>
            <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.2336653206467!2d104.23897171497262!3d15.525599457900203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3117b36313d20625%3A0x19b70e389ec76ff9!2z4LmA4Lia4Liq4LiX4LmM4LmC4Lif4LmC4LiV4LmJ!5e0!3m2!1sth!2sth!4v1679864353366!5m2!1sth!2sth" width="500" height="300" className='mapborder' ></iframe>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Footer
