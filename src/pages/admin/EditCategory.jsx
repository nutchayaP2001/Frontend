import React ,{ useEffect } from 'react'
import FormEditCategory from '../../components/admin/FormEditCategory';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import Layout from '../Layout';
const EditCategory = () => {
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
    <FormEditCategory/>
  </Layout>
  )
}

export default EditCategory;
