import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
const cookies=new Cookies();
const Navigate = (props) => {
  const Commponent=props.Component;
  const userId=cookies.get('userId')
  const token=cookies.get('token')

  console.log(userId)
  console.log(token)

  const navigate=useNavigate();
    useEffect(() => {
        console.log('token')
      if(userId || token){
        console.log('navigate',cookies.userId)
        navigate('/')      
      }
    },[]) 
  return (<>
    {!cookies.token && !cookies.userId && <Commponent/>}
    </>
  )
}

export default Navigate