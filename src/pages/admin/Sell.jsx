import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice';
import Layout from '../Layout'
import SellProduct from '../../components/admin/SellProduct';

const Sell = () => {
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
  }, [isError, user, navigate]);
  return (
    <Layout>
      <SellProduct/>
    </Layout>
  )
}

export default Sell