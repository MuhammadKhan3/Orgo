import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
const cookies=new Cookies();
const Protect = (props) => {
  const Commponent=props.Component;
  const userId=cookies.get('userId')
  const token=cookies.get('token')

  const navigate=useNavigate();
    useEffect(() => {
      if(!userId || !token){
        navigate('/login')      
      }
    },[])
  return (<>
    {token && userId && <Commponent/>}
    </>
  )
}

export default Protect