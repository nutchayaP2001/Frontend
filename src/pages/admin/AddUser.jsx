import React, { useEffect } from 'react'
import FormAddUser from '../../components/admin/FormAddUser';
// import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
// import Sidebar from '../conponents/Sidebar';
import Layout from '../Layout';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state => state.auth));

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
    
  useEffect(() => {
    if(isError){
      navigate("/");
    }
    if(user && user.userRole !== "แอดมิน"){
      navigate("/home")
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
    <FormAddUser/>
    
  </Layout>
  )
}

export default AddUser;
