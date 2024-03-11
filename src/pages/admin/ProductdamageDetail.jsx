import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout'
import { getMe } from '../../features/authSlice'
import ProductDamageDetail from '../../components/admin/ProductDamageDetail'

const ProductdamageDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
      
    useEffect(() => {
      if(isError){
        navigate("/");
      }
    }, [isError, navigate]);
  return (
    <Layout>
        <ProductDamageDetail/>
    </Layout>
  )
}

export default ProductdamageDetail