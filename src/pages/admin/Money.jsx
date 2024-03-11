import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../features/authSlice';
import Moneylist from '../../components/admin/Moneylist';
import Layout from '../Layout';

const Money = () => {
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
      <Moneylist/>
    </Layout>
  )
}

export default Money
