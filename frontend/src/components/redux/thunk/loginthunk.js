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
          if(response.data.userType==='company' || response.data.userType==='freelancer'){
            console.log('1')
            let hour = new Date();
            hour.setTime(hour.getTime() + (60*60*1000));
            cookies.set('token',response.data.token,{expires:hour});
            cookies.set('userId',response.data.userId,{expires:hour});    
            cookies.set('companyId',response.data.companyId,{expires:hour});
            cookies.set('userType',response.data.userType,{expires:hour});    
            cookies.set('authenticate',response.data.authenticate,{expires:hour});    
            dispatch(user_action.setchangestatus(response.data.status));
            navigate('/')

          }else if(response.data.userType==='employee'){
            console.log('2')

              let hour = new Date();
              hour.setTime(hour.getTime() + (60*60*1000));
              cookies.set('token',response.data.token,{expires:hour});
              cookies.set('userId',response.data.userId,{expires:hour});    
              cookies.set('userType',response.data.userType,{expires:hour});
              cookies.set('employeeId',response.data.employeeId,{expires:hour});    
              cookies.set('authenticate',response.data.authenticate,{expires:hour});    
              dispatch(user_action.setchangestatus(response.data.status));
              navigate('/')
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