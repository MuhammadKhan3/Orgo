import React,{useEffect} from 'react'
import ClientHeader from '../components/client/ClientHeader'
import CompanyDetails from '../components/client/CompanyDetails'
import '../pages/client.css'
import {useSelector,useDispatch} from 'react-redux'
import FetchEmployee from '../components/redux/thunk/FetchEmployee'

function Client() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(FetchEmployee())
  },[])


  return (
    <div className='main-client'>
        <ClientHeader/>
        <CompanyDetails/>
    </div>
  )
}

export default Client