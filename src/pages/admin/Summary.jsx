import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
// import Sidebar from '../conponents/Sidebar';
import Summarylist from '../../components/admin/Summarylist';
import Layout from '../Layout';

const Summary = () => {
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
      <Summarylist/>
    </Layout>
  )
}

export default Summary
