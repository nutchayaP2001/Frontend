import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductCard = ({product,handleRemove}) => {
    // console.log(product)
    const{uuid,ProName,ProDes,ProPrice,ProQuantity,ProURL,CatName,category,categoryId} = product



  return (
    <div>
       <Card sx={{ width: 250}}  >
      {/* <CardActionArea> */}
      <div className="mgCard">
 <CardMedia
          component="img"
        //   height="140"
        // width={500}
        className='brimg'
          image={ProURL}
          alt="green iguana"
        />
        {/* <CardContent> */}
        <div className='mt-3'>
          <Typography gutterBottom variant="h6"  component="div">
           <div className="text-color">
           {ProName} 
           {/* {category.CatName} */}
           </div>
          </Typography>
          <Typography variant="body2" >
            <div className="text-color">
            {ProDes} {ProPrice} {ProQuantity}
            </div>
          </Typography>
        </div>
          
        {/* </CardContent> */}
      </div>
       
      {/* </CardActionArea>    */}
      <CardActions >
     <div className='btn-center'>
        <Link to={`/products/edit/${uuid}`} >
        <AiFillEdit className='edit'/>
        </Link>
        <Link   onClick={()=> handleRemove(uuid)}>
        <AiFillDelete className='btndelete'
       />
        </Link>
     </div>

      </CardActions>
    </Card>
    </div>
  )
}

export default ProductCard