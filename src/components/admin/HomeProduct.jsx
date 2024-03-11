import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Pagination, TablePagination } from '@mui/material';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const HomeProduct = ({product,handleRemove,selectData}) => {

  // Pagination
// const [page, setPage] = useState(0);
// const [rowperpage, setRowPerpage] = useState(5);
  
// const handlechangepage = (e,newpage) => {
//   setPage(newpage)
// }
// const handleRowsPerPage = (e) => {
//   setRowPerpage(+e.target.value)
//   setPage(0)
// }


  return (
    <div >

          <div className="flex-btnhead">
          <Link to="/products/add" className="btnadd mt-3" title='เพิ่มสินค้า'>
          &#65291; เพิ่มสินค้า
        </Link>
        </div>
        
        {/* <TablePagination
        rowsPerPageOptions={[5,10,25]}
        rowsPerPage={rowperpage}
        page={page}
        count={product.length}
        component='div'
        onPageChange={handlechangepage}
        onRowsPerPageChange={handleRowsPerPage}
        >

        </TablePagination> */}
      {product.length < 1 && <p className='has-text-centered mt-3'>ไม่พบสินค้าที่ค้นหา</p>}

      <div className="containerProduct">
        
        
        {
        product
        // .slice(page * rowperpage, page* rowperpage+rowperpage)
        .map((item) => (
          
         <div sx={{ width: 250}} key={item.id} className='mt-3 mgCard' >
      {/* <CardActionArea> */}
      <div className="">
 <CardMedia
          component="img"
        //   height="140"
        // width={500}
        className='brimg'
          image={item.ProURL}
          alt=""
        />
        {/* <CardContent> */}
        <div className='mt-2'>
          <Typography gutterBottom   component="div">
           <div className="text-color">
          <b>หมวดหมู่: </b> {item.category.CatName} <br />
          <b>ชื่อสินค้า:</b> {item.ProName} <br /> 
          <b>ขนาด: </b> {item.ProSize}
           </div>
          </Typography>
        </div>
          
        {/* </CardContent> */}
      </div>
       
      {/* </CardActionArea>    */}
      <CardActions >
     <div className='btn-center'>
        <Link to={`/products/edit/${item.id}`} >
     {/* <Button   > */}
        <AiFillEdit className='edit'/>
        {/* </Button> */}
        </Link>
        <Link   onClick={()=> handleRemove(item.id)}>
        <AiFillDelete className='btndelete'
       />
        </Link>
     </div>

      </CardActions>
    </div>
      ))}

      </div>
      
      
    </div>
  )
}

export default HomeProduct