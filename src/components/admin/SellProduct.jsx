// import { Card, CardActions, CardMedia, Typography } from '@mui/material';
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardSale from "./CardSale";
import { AiOutlineSearch } from "react-icons/ai";
import { Breadcrumbs, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ProductTableInSale from "./ProductTableInSale";
// import { userCart } from "../../functions/userCart";
// import { ComponentToPrint } from "./ComponentToPrint";
// import {useReactToPrint} from 'react-to-print'
import { values } from "lodash";
import ListProductSale from "./ListProductSale";
import AppPagination from "./AppPagination";
// import { useGetAllProductsQuery } from "../../features/productApi";

const SellProduct = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState([]);
  // ข้อมูลที่เลือก
  const [selectData, setSelectData] = useState([]);
  // ข้อมูลที่ใช้ loop ใน dropdown
  const [dropdown, setDropdown] = useState([]);
  const [currentbtn, setCurrentBtn] = useState("")

  // const {items, status} = useSelector(state => state.productsale)

  // const { data, error, isLoading} = useGetAllProductsQuery();
  

  // พิมพ์ค้นหา
  const search = (product) => {
    return product.filter(
      (item) =>
        item.ProName.toLowerCase().includes(query) ||
        item.ProSize.toLowerCase().includes(query) ||
        item.category.CatName.toLowerCase().includes(query)
    );
  };


  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage] = useState(8)


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
      .get('https://dark-erin-gharial-ring.cyclic.app/api/productsale')
      .then((res) => {
        //  console.log(res.data)
        setProduct(res.data);
        setSelectData(res.data);
        setLoading(false);

        const dataDrop = [
          ...new Set(res.data.map((item) => item.category.CatName))];
          setDropdown(dataDrop)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // ค้นหาด้วยหมวดหมู่
  const handleSelectCategory = (itemData) => {
    
    const filterData = product.filter((item) => {
      return item.category.CatName === itemData;
  })
    setSelectData(filterData);
    setCurrentBtn(filterData)
  };
  

  return (
    <div>
      <h1 className="is-size-3 has-text-weight-semibold has-text-centered">
        {/* <span>ขายสินค้า</span> */}
      </h1>

    <Breadcrumbs aria-label="breadcrumb" className="text-color mt-3">
        <Link to="/home" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <h3 className="text-color">ขายสินค้า</h3>
      </Breadcrumbs>
  <div className="input-group-user ">
            <input
              type="search"
              className="inp-style"
              required
              onChange={(e) => setQuery(e.target.value)}
            />

            <label className="label-inp">
              <span className="icon">
                <AiOutlineSearch />
              </span>
              ค้นหา
            </label>
          </div>
          
      {/* <div className="containercard"> */}
<ul className="buttonFilter">
  <li><button className="btn-filter btn-current" onClick={() => setSelectData(product)}>ทั้งหมด</button></li>
  {
    dropdown.map((item) => <li><button className={`btn-filter ${currentbtn === item ? "btn-current" : ""}`} onClick={()=> {handleSelectCategory(item)}}>{item}</button></li>)
  }
</ul>

      {/* </div> */}
    

    
      <div className="columns">
        
        <div className="flexcard">
          {/* {product.length < 1 && <p>No Product Found</p>} */}
          {
      //     isLoading ? (
      //   <h2 className="mt-4 text-center text-color">Loading...</h2>
      // ) :
      (
        <>
        <h2 className="mt-4  is-size-3 text-center text-color">รายการสินค้า</h2>
        <div className="cardsalecontent"> 

          {product.map((item, index) => (
            <CardSale key={index}
            product={search(product && selectData) && item} 
            />

            ))} 
        </div> 
        </>
       )} 
          

             {/* <div className="page">
             <Pagination count={10} showFirstButton showLastButton />
             
             </div> */}
             <div className="page">
               <nav class="pagination is-rounded is-centered mt-3" role="navigation" aria-label="pagination">
  <ul class="pagination-list">
    <li><a class="pagination-link is-current" aria-label="Goto page 1">1</a></li>
    <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
  </ul>
</nav>
  {/* <AppPagination
          productPerPage={productPerPage}
          totalProduct={product.length}
          paginate={paginate}
          /> */}
             </div>
             
        </div>
       

        <ListProductSale/>

      </div>
    </div>
  );
};

export default SellProduct;
