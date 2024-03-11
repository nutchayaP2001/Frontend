import { Dialog, DialogContent, DialogContentText, DialogTitle, TablePagination } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const CategoryTable = ({category,handleRemove}) => {

// const [page, setPage] = useState(0);
// const [rowperpage, setRowPerpage] = useState(5);


// const handlechangepage = (e,newpage) => {
//   setPage(newpage)
// }
// const handleRowsPerPage = (e) => {
//   setRowPerpage(+e.target.value)
//   setPage(0)
// }
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

const EditCategory = async (id,value) => {
    await axios.patch(`http://localhost:3000/api/category/`+id,value)
   
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
  return (
    <div>
        <div className="TableWidth">

  
        <div className="containercard">
        {/* <TablePagination
        rowsPerPageOptions={[5,10,25]}
        rowsPerPage={rowperpage}
        page={page}
        count={category.length}
        component='div'
        onPageChange={handlechangepage}
        onRowsPerPageChange={handleRowsPerPage}
        >
        </TablePagination>
         */}
        <table className="table-style tMargin">
    
    <thead className="has-text-centered">
   
        <tr>
            {/* <th className="text-color">ลำดับ</th> */}
            <th className="text-color">หมวดหมู่สินค้า</th>
            <th className="text-color">จัดการ</th>

        </tr>
    </thead>

    {category.length < 1 && <tr >
       <td className='td has-text-centered text-color' colSpan={2}>ไม่พบสินค้าที่ค้นหา</td> </tr>}
    {category
    // .slice(page * rowperpage, page* rowperpage+rowperpage)
    .map((item) =>  (
        <tbody className="has-text-centered text-color">
            
            <tr className="tr">
                {/* <td className="td" width={20}>{index+1}</td> */}
                
                <td className="td text-color">{item.CatName}</td>
                <td className="td text-color" width={250}>
                  
                    <div className="flex-btn">
                    <Link to={`/category/edit/${item.uuid}`}>
                    {/* <button> */}
                <AiFillEdit  className="edit" />
                    {/* </button> */}
                    </Link>
                    
                    <Link onClick={()=>handleRemove(item.uuid)} >
                      <AiFillDelete className="btndelete" />
                    </Link>
                    </div>
                   
                    </td>
    
            </tr>
        </tbody>
    ))}
</table>

        </div>
        </div>
       
    </div>
  )
}

export default CategoryTable