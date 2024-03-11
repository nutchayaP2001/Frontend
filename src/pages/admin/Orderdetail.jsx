import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice';
import Layout from '../Layout'
import OrderDetail from '../../components/admin/OrderDetail';

const Orderdetail = () => {
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
      <OrderDetail/>
    </Layout>
  )
}

export default Orderdetail
