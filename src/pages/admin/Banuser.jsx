import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../features/authSlice'
// import Sidebar from '../conponents/Sidebar'
import Banuserlist from '../../components/admin/Banuserlist'
import Layout from '../Layout'

const Banuser = () => {
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
      <Banuserlist/>
    </Layout>
  )
}

export default Banuser
