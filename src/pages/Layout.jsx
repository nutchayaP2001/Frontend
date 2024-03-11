import React from 'react';
import "../css/Style.css";
import Dropdown from '../components/admin/DropDown/Dropdown';
import Footer from '../components/admin/Footer'


const Layout = ({children}) => {
  return (
    <React.Fragment>
    <div className="bg">

          <Dropdown/>

      <div style={{minHeight: "100vh"}}>
        
          <div className="column mr-5 is-2">
          {/* <Sidebar /> */}
          </div>
          <div className="layout-body">
              <main>{children}</main>
          </div>
      </div>

<Footer/>
</div>

  </React.Fragment>
  )
}

export default Layout