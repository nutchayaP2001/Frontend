import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { Link } from "react-router-dom";
import HomeProduct from "./HomeProduct";
import {toast} from 'react-toastify'
import { AiOutlineSearch } from "react-icons/ai";
import { Breadcrumbs, Pagination, TablePagination, Typography } from "@mui/material";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import AppPagination from "./AppPagination";

function Productlist() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
    // ข้อมูลที่เลือก
    const [selectData, setSelectData] = useState([])

    // ข้อมูลที่ใช้ loop ใน dropdown
    const [dropdown, setDropdown] = useState([])

      const [currentPage, setCurrentPage] = useState(1)
      const [productPerPage] = useState(14)


const search = (product) => {
  return product.filter(
    (item) => 
  item.ProName.toLowerCase().includes(query) ||
  item.ProSize.toLowerCase().includes(query) ||
  item.category.CatName.toLowerCase().includes(query)||
  item.ProDes.toLowerCase().includes(query)
  )
}

const indexOfLastProduct = currentPage * productPerPage;
const indexOfFirstProduct = indexOfLastProduct - productPerPage;
const currentProduct = product.slice(indexOfFirstProduct,indexOfLastProduct);

// change page
const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:3000/api/products`)
      .then((res) => {
        setLoading(false);
        //  console.log(res.data)
        setProduct(res.data);
        setSelectData(res.data)

        const dataDrop = [...new Set(res.data.map(item => item.category.CatName))]
        setDropdown(dataDrop)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = async(id)=> {
    try {
      if(window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่ ?")){
        await axios.delete(`http://localhost:3000/api/products/${id}`)
        .then(res=> {
          loadData(100)
          toast.success("การลบรายการสำเร็จ")
          console.log(res)
        }).catch(err=>{
          toast.error("การลบรายการมีปัญหา")
          console.log(err)
        })
      }
      
    } catch (error) {
      console.log(error);
      
    }
  
}
const handleSelectCategory = (itemData) => {
    
  const filterData = product.filter((item) => {
    return item.category.CatName === itemData;
})
  setSelectData(filterData);}
  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered text-color">
          {/* <IoNotifications /> */}
          รายการสินค้า
      </h1>

      <Breadcrumbs aria-label="breadcrumb" className="text-color mt-3">
        <Link to="/home" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <h3 className="text-color">รายการสินค้า</h3>
      </Breadcrumbs>

      <div className=''>
        {/* {loading ? <h1>Loading...</h1> : <h1>Product List</h1>} */}

        <div className="flex">
  <div className="buttonFilter-order">
  <button className="btn-filter btn-current" onClick={() => setSelectData(product)}>ทั้งหมด</button>
  {
    dropdown.map((item) => <button className="btn-filter" onClick={()=> {handleSelectCategory(item)}}>{item}</button>)
  }
 
</div>



          <div className="input-group-user inp-search-right">
            <input type="search" 
            className='inp-style'
            required
            onChange={(e) => setQuery(e.target.value)} />
             
            <label className="label-inp" ><span className='icon'><AiOutlineSearch/></span>ค้นหาด้วยชื่อสินค้า</label>

            </div>
               
            
          </div>
      

        
            <HomeProduct
            handleRemove={handleRemove}
            product={search(product && selectData 
              // &&currentProduct
               )}
            
            />
          <AppPagination
          productPerPage={productPerPage}
          totalProduct={product.length}
          paginate={paginate}
          />
            
             
      </div>

      
    </div>
  );
}

export default Productlist;
