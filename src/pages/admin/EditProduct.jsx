import React ,{ useEffect } from 'react'
import FormEditProduct from '../../components/admin/FormEditProduct';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import Layout from '../Layout';
const AddProduct = () => {
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
    <FormEditProduct/>
  </Layout>
  )
}

export default AddProduct;
