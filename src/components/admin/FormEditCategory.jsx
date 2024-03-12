import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { IoPeople } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditCategoryTable from './EditCategoryTable';
import { Breadcrumbs } from '@mui/material';
import AppPagination from './AppPagination';

const FormEditCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const param = useParams();
    const [CatName, setCatname] = useState("");

    const [query, setQuery] = useState("");
    const search = (category) => {
      return category.filter(
        (item) => 
      item.CatName.toLowerCase().includes(query)
      )
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage] = useState(6)

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = category.slice(indexOfFirstProduct,indexOfLastProduct);
    
    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    useEffect(() => {
        getData(param.id);
    },[]);

    const getData = async (id) => {
        await axios.get(`https://dark-erin-gharial-ring.cyclic.app/api/category/${id}`)
        // getCategoryById(id)
        .then((res) => {
           setCatname(res.data.CatName)
        // console.log(res.data.CatName)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const EditCategory = async (id,value) => {
     await axios.patch(`https://dark-erin-gharial-ring.cyclic.app/api/category/`+id,value)

    }
    const handleSubmit = (e) => {
        e.preventDefault();
    //    console.log(CatName)
    EditCategory(param.id, {CatName})
       .then((res) => {
        toast.success("แก้ไขสำเร็จ")
        navigate("/category");
        console.log(res)
       })
       .catch((err) => {
        toast.error("การแก้ไขมีปัญหา")
        console.log(err)
       });
    } 
    useEffect(() => {
      loadData();
  }, []);

  const loadData = async () => {
      await axios.get("https://dark-erin-gharial-ring.cyclic.app/api/category")
      .then(res => {
          setCategory(res.data)
      })
      .catch((err) => {
          console.log(err)
      })
  }
  // const handleRemove = async (id) => {
  //     try {
  //         if(window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
  //     await axios.delete(`http://localhost:3000/category/${id}`)
  //       .then((res) => {
  //         loadData()
  //     toast.success("การลบรายการสำเร็จ")
  //     console.log(res)

  // }).catch((err) => {
  //     console.log(err)
  //     toast.success("การลบรายการมีปัญหา")

  // })
      
  // }
  //     } catch (error) {
  //   console.log(error);
          
  //     }}
    
  return (
    <div>
         <h1 className="is-size-3 has-text-weight-semibold text-color has-text-centered">แก้ไขหมวดหมู่สินค้า
      </h1>
      <div>
      <Breadcrumbs aria-label="breadcrumb" className="text-color">
        <Link to="/category" underline="hover" className="text-color">
          &#9666; กลับ
        </Link>
        <h3 className="text-color">แก้ไขหมวดหมู่สินค้า</h3>
      </Breadcrumbs>
      {/* <div className="containercard"> */}
      <div className='containercard '>

      <form  onSubmit={handleSubmit} className='form-container'>
          <div className="flex">
              <div className="inp">
              <input type="text"
               className='inp-style' 
               required
               onChange={(e) => setCatname(e.target.value)}
              name='CatName'
              value={CatName}/>

              <label className='label-inp'>แก้ไขหมวดหมู่สินค้า</label>

          </div>
          
           <button type='submit' className='buttons'>บันทึก</button> 
              </div> 
                

      </form>

          <div className="flex inp-right-cat">
            <div className="input-group-user">
            <input type="search" 
            className='inp-style bnt-center'
            required
            onChange={(e) => setQuery(e.target.value)} />
             
            <label className="label-inp" ><span className='icon'><AiOutlineSearch/></span>ค้นหา</label>

            </div>
          </div>

  </div>
</div>
<EditCategoryTable
category={search(category && currentProduct)}/>

<AppPagination
          productPerPage={productPerPage}
          totalProduct={category.length}
          paginate={paginate}
          />
      </div>
       
        // </div>
    // </div>
  )
}

export default FormEditCategory
