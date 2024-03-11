import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Layout from '../Layout'
import { getMe } from '../../features/authSlice'
import PayDetail from '../../components/admin/PayDetail'

const PaymentDetail = () => {
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
      <PayDetail/>
    </Layout>
  )
}

export default PaymentDetail
