import {
  Card,
  CardActions,
  CardMedia,
  // TablePagination,=
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// lodash
import _ from 'lodash'
import { addToCart } from "../../features/cartSlice";
import { toast } from "react-toastify";


const CardSale = ({ product }) => {
  const {ProName,ProSize,ProURL,category,ProPrice,ProQuantity} = product
const dispatch = useDispatch()
const [quantity, setQuantity] = useState(1);

const handleAddToCart = (productId) => {
    dispatch(addToCart(productId,quantity,product))
  toast.success(`เพิ่ม ${ProName} ลงตระกร้าเรียบร้อย`)
}

  return (
    <div>

{/* <div className="cardcenter"> */}

          {/* <div className="cardsalecontent"> */}
            {product.length < 1 && 
              <p className="has-text-centered mt-3 ">ไม่พบสินค้าที่ค้นหา</p>
            }

            {/* {
              product.map((item) => ( */}

                <button
                  sx={{ width: 250 }}
                  // key={index}
                  onClick={()=>handleAddToCart(product.id)}
                  className="mgCard"
                  
                >
                  {/* <CardActionArea> */}
                  {/* <div> */}
                    <CardMedia
                      component="img"
                      //   height="140"
                      // width={500}
                      className="brimg"
                      image={ProURL}
                      alt=""
                    />
                    <div className="mt-3">
                      <Typography gutterBottom component="div">
                        <div className="text-color text-card">
                          {/* หมวดหมู่: {category.CatName} <br /> */}
                          {ProName} ({ProQuantity}) <br />
                          {/* ขนาด: {ProSize} <br /> */}
                          ราคา {ProPrice} บาท
                        </div>
                      </Typography>
                    </div>
                  {/* </div> */}
                  {/* <CardActions>
                    <button className="btn-choose" onClick={handleAddToCart}>เลือก</button>
                  </CardActions> */}
                </button>
              {/* </div> */}

            {/* ))} */}

          </div>
      //  </div>
  );
};

export default CardSale;
