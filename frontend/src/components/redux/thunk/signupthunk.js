import axios from 'axios'
import React from 'react'
import { Cookies } from 'react-cookie'
import { user_action } from '../slice/userSlice';

const cookies=new Cookies();
const signupThunk = (obj,navigate) => {
  return async (dispatch)=>{

    const signup=async ()=>{
      console.log(obj);
        const response=await axios.post('http://localhost:8000/signup',obj);
        
        if(response.data.msg){
          dispatch(user_action.seterrors(response.data.msg));
        }else{
          let hour = new Date();
          hour.setTime(hour.getTime() + (60*60*1000));
          cookies.set('token',response.data.token,{expires:hour});
          cookies.set('userId',response.data.userId,{expires:hour});    
         dispatch(user_action.setchangestatus(response.data.status));
        }
    }
    signup();
  }
}

export default signupThunk