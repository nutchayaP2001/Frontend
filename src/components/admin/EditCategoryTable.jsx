import { Dialog, DialogContent, DialogContentText, DialogTitle, TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const EditCategoryTable = ({category}) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
const param = useParams();
const [CatName, setCatname] = useState("");

const [open, setOpen] = useState(false);
const functionopenpopup = () => {
  setOpen(true);
}
const closepopup = () => {
  setOpen(false)
}
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
EditCategory(param.uuid, {CatName})
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
      setCategories(res.data)
  })
  .catch((err) => {
      console.log(err)
  })
}
const handleRemove = async (id) => {
    try {
        if(window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
    await axios.delete(`https://dark-erin-gharial-ring.cyclic.app/api/category/${id}`)
      .then((res) => {
        loadData()
    toast.success("การลบรายการสำเร็จ")
    console.log(res)
//  window.location.reload('/category/add');
    // navigate('/category')

}).catch((err) => {
    console.log(err)
    toast.success("การลบรายการมีปัญหา")

})
    
}
    } catch (error) {
  console.log(error);
        
    }}
  
  return (
    <div>
       
       <div className='containercard '>



        <table className="table-style tMargin breaktable">
    
    <thead className="has-text-centered">
        <tr>
            {/* <th className="text-color">ลำดับ</th> */}
            <th className="text-color">หมวดหมู่สินค้า</th>
            <th className="text-color">จัดการ</th>

        </tr>
    </thead>
    {category.length < 1 && <tr >
       <td className='td has-text-centered text-color'>ไม่พบสินค้าที่ค้นหา</td> </tr>}
    
    {category
    .map((item) =>  (
        <tbody className="has-text-centered text-color">
            <tr className="tr">
                {/* <td className="td" width={20}>{index+1}</td> */}
                <td className="td">{item.CatName}</td>
                <td className="td" width={160}>
                  
                    <div className="flex-btn">
                    {/* <Link to={`/category/edit/${item.uuid}`}>
                <AiFillEdit  className="edit"/>
                    </Link> */}
                         
                    <Link onClick={()=>handleRemove(item.uuid)} >
                      <AiFillDelete className="btndelete"/>
                    </Link>
                    </div>
                   
                    </td>
                
                
            </tr>
        </tbody>
    ))}
</table>

    </div>
    </div>
  )
}

export default EditCategoryTable
