import axios from 'axios'
import React from 'react'
import { Cookies } from 'react-cookie'
import { user_action } from '../slice/userSlice';
//Login Thunk to send the data to server
const cookies=new Cookies();

const LoginThunk = (obj,navigate) => {
  return async (dispatch)=>{
    const login= async ()=>{
        axios.post('http://localhost:8000/login',obj)
        .then(response=>{
          console.log(response)
          if(response.data.flag){
            let hour = new Date();
            hour.setTime(hour.getTime() + (60*60*1000));
            cookies.set('token',response.data.token,{expires:hour});
            cookies.set('userId',response.data.userId,{expires:hour});    
            navigate('/');
          }else{
            dispatch(user_action.setflag(response.data.flag));
            dispatch(user_action.setdata(response.data.data));
          }
 
        });
        
    }
    login();
  }
}

export default LoginThunk