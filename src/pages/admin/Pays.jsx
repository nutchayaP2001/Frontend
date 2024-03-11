import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice';

import Paylist from '../../components/admin/Paylist'
import Layout from '../Layout'

const Pays = () => {
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
      <Paylist/>
    </Layout>
  )
}

export default Pays
