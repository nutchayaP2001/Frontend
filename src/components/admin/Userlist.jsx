import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import { AiFillDelete, AiFillEdit } from "react-icons/ai";
// import { TiMediaPlayReverse } from "react-icons/ti";
import "../../css/Style.css";
import TableUser from "./TableUser";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import { Breadcrumbs } from "@mui/material";
import AppPagination from "./AppPagination";

export const Userlist = () => {
const [query, setQuery] = useState("")
  // ข้อมูลในตารางต้นฉบับ
  const [users, setUsers] = useState([]);

  // ข้อมูลที่เลือก
  const [selectData, setSelectData] = useState([])

  // ข้อมูลที่ใช้ loop ใน dropdown
  const [dropdown, setDropdown] = useState([])

  const search = (users) => {
    return users.filter(
      (item) => 
      item.userFname.toLowerCase().includes(query) ||
      item.userLname.toLowerCase().includes(query) ||
      item.userEmail.toLowerCase().includes(query) ||
      // item.userRole.toLowerCase().includes(query) ||
      item.userProvince.toLowerCase().includes(query) ||
      item.userTel.toLowerCase().includes(query) 


    )
  }
  const [currentPage, setCurrentPage] = useState(1)
      const [productPerPage] = useState(6)

      const indexOfLastProduct = currentPage * productPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productPerPage;
      const currentProduct = users.slice(indexOfFirstProduct,indexOfLastProduct);
      
      // change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber)
      
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://dark-erin-gharial-ring.cyclic.app/api/users");
    console.log(response.data)
    setUsers(response.data);
    setSelectData(response.data)
    // [...new Set(array)]
    const dataDrop = [...new Set(response.data.map(item => item.userRole))] 
    setDropdown(dataDrop)
  };


    const deleteUser = async (userId) => {
        try {
          if(window.confirm(`คุณต้องการลบรายการนี้ใช่หรือไม่?`)){
            await axios.delete(`https://dark-erin-gharial-ring.cyclic.app/api/users/${userId}`)
          .then((res)=> {
          getUsers()
            toast.success("ลบรายการสำเร็จ")
            console.log(res)
          }).catch((err) => {
            console.log(err)
            toast.error("การลบรายการมีปัญหา")
          })
          }
          
        } catch (error) {
          console.log(error);
        }
        
      };

  const handleSelectRole = (itemRole) => {
    
      const filterData = users.filter((item)=> {
        return item.userRole === itemRole
      })
      setSelectData(filterData)
      console.log(filterData)
    }

  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
        <span className="">
          {/* <IoPeople /> */}
        {/* &nbsp;  */}
        ผู้ใช้งานระบบ
        </span>
        
      </h1>
      <Breadcrumbs
       aria-label="breadcrumb" className="text-color mt-3">
        <Link to="/home" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <h3 className="text-color">ผู้ใช้งานระบบ</h3>
      </Breadcrumbs>

      {/* <div className="containercard"> */}
      <form>
        <div className="flex">
        <div className="buttonFilter-order ">


<button className="btn-filter " onClick={() => setSelectData(users)}>ทั้งหมด</button>

{dropdown.map((item,i) => (
<button className="btn-filter"  key={i} onClick={() => handleSelectRole(item)} >{item}</button>

))}
</div>

   

  <div className="input-group-user inp-search-right">
            <input type="search" 
            className='inp-style'
            required
            onChange={(e) => setQuery(e.target.value)} />
             
            <label className="label-inp" ><span className='icon'><AiOutlineSearch/></span>ค้นหา</label>

            </div>
      </div>
      </form>
      

<div className="flex-btnhead">
<Link to="/users/add" className="btnadd mt-3">
        	
          &#65291; เพิ่มข้อมูล
                  </Link>

</div>

        <TableUser
        deleteUser={deleteUser}
        selectData={search(users && selectData
          //  && currentProduct
           )}
        />
      
      <AppPagination
          productPerPage={productPerPage}
          totalProduct={users.length}
          paginate={paginate}
          />

      </div>
    // </div>
  );
};

export default Userlist;
