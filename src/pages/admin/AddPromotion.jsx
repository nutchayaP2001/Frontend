import React, { useEffect } from 'react'
import Layout from '../Layout'
import FormAddPromotion from '../../components/admin/FormAddPromotion'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';

const AddPromotion = () => {
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
        <FormAddPromotion/>
    </Layout>
  )
}

export default AddPromotion