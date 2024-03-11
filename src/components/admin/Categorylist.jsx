import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit, AiOutlineSearch } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormAddCategory from './FormAddCategory'
import CategoryTable from './CategoryTable'
import { Breadcrumbs} from '@mui/material'
import AppPagination from './AppPagination'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const Categorylist = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([])
  const [values, setValues] = useState({
    CatName: ""
  });

const [open, setOpen] = useState(false);
const functionopenpopup = () => {
  setOpen(true);
}
const closepopup = () => {
  setOpen(false)
}

  const [query, setQuery] = useState("");
  const search = (category) => {
    return category.filter(
      (item) => 
    item.CatName.toLowerCase().includes(query)
    )
  }
  const createCategory = async (value) => {
    await axios.post("https://bestphotodigital.com/api/category", value)
}

  const [currentPage, setCurrentPage] = useState(1)
      const [productPerPage] = useState(6)

      const indexOfLastProduct = currentPage * productPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productPerPage;
      const currentProduct = category.slice(indexOfFirstProduct,indexOfLastProduct);
      
      // change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber)
      
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await axios.get("http://localhost:3000/api/category")
        .then(res => {
            // console.log(res.data)
            setCategory(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    const handleRemove = async (id) => {
        try {
            if(window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
        await axios.delete(`http://localhost:3000/api/category/${id}`)
          .then((res) => {
            loadData()
        toast.success("ลบรายการสำเร็จ")
        console.log(res)

    }).catch((err) => {
        console.log(err)
        toast.error("การลบรายการมีปัญหา")

    })
        
    }
        } catch (error) {
      console.log(error);
            
        }}

        const handleChangeCategory = (e) => {
          // console.log(values.CatName)
          // console.log(e.target.value)
          setValues({...values,[e.target.name]:e.target.value})
         
      }
      const handleSubmit = (e) => {
          e.preventDefault();
        
          createCategory(values)
          
          .then((res) => {
          window.location.reload();
          toast.success("บันทึกสำเร็จ");
          console.log(res)
          })
          .catch((err) => {
              console.log(err)
          toast.error("การบันทึกมีปัญหา")
      
          });
      }


        
  return (
    <div>
             <h1 className="is-size-3 has-text-weight-semibold text-color has-text-centered">
     หมวดหมู่สินค้า
      </h1>
      <Breadcrumbs aria-label="breadcrumb" className="text-color breadcrumbs mt-3">
        <a href="/home" underline="hover">
          &#9666; กลับ
        </a>
        <Breadcrumb.Item active className="text-color">หมวดหมู่สินค้า</Breadcrumb.Item>
      </Breadcrumbs>

  <div className='containercard '>

  <form  onSubmit={handleSubmit} className='form-container'>
            <div className="flex">
                <div className="inp">
                <input type="text"
                 className='inp-style' 
                 required
                onChange={(e) => handleChangeCategory(e)} 
                name='CatName'
                value={values.CatName}/>

                <label className='label-inp'>เพิ่มหมวดหมู่สินค้า</label>

            </div>
            <button  type='submit' className='buttons' 
                 
                >บันทึก</button> 
                </div> 
                        
        
           
        </form>

  {/* <button className='btnaddCat' onClick={functionopenpopup}>เพิ่มหมวดหมู่สินค้า</button>


  <Dialog  open={open}>
 
    <DialogTitle className='bg-dialog'><span className="text-color">เพิ่มหมวดหมู่สินค้า</span>
    <span className="flex btncatRight">
      <button onClick={closepopup} className='closebtn'>X</button>
    </span>
    


    </DialogTitle>
    <DialogContent className='bg-dialog'>
      <DialogContentText>
      <form  onSubmit={handleSubmit} className='form-container'>
            <div className="flex">
                <div className="inp">
                <input type="text"
                 className='inp-style-cat' 
                 required
                onChange={(e) => handleChangeCategory(e)} 
                name='CatName'
                value={values.CatName}/>

                <label className='label-inp'>เพิ่มหมวดหมู่สินค้า</label>

            </div>
            
                </div> 

                <div className="flex btncatRight">
                   <button type='submit' className='buttons'>บันทึก</button> 
      
                </div>
  
        </form>
       
      </DialogContentText>
    </DialogContent>
   
  </Dialog> */}

  

          <div className="flex inp-right-cat">
            <div className="input-group-user">
            <input type="search" 
            className='inp-style'
            required
            onChange={(e) => setQuery(e.target.value)} />
             
            <label className="label-inp" ><span className='icon'><AiOutlineSearch/></span>ค้นหา </label>

            </div>
          </div>

       
  </div>
  
     <CategoryTable
          category={search(category && currentProduct)}
          handleRemove={handleRemove}/>
    
    <AppPagination
          productPerPage={productPerPage}
          totalProduct={category.length}
          paginate={paginate}
          />
    </div>
  )
}

export default Categorylist