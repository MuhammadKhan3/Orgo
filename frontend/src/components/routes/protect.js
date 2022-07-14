import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Protect = (props) => {
  const Commponent=props.Component;
  const [cookies, setCookie] = useCookies(['userId']);
  const navigate=useNavigate();
    useEffect(() => {
      if(!cookies.userId || !cookies.token){
        navigate('/login')      
      }
    },[])
    console.log(Commponent)    
  return (<>
    {cookies.token && cookies.userId && <Commponent/>}
    </>
  )
}

export default Protect