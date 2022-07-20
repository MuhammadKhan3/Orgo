import axios from 'axios'
import React from 'react'
import { user_action } from '../slice/userSlice';
import { Cookies } from 'react-cookie'

const cookies=new Cookies();
// Send the signup data to server
const signupThunk = (obj,navigate) => {
  return async (dispatch)=>{

    const signup=async ()=>{
      console.log(obj);
        const response=await axios.post('http://localhost:8000/signup',obj);
        console.log(response.data);

        if(response.data.msg){
          dispatch(user_action.seterrors(response.data.msg));
        }else{
          if(response.data.userType==='company' || response.data.userType==='freelancer'){
            let hour = new Date();
            hour.setTime(hour.getTime() + (60*60*1000));
            cookies.set('token',response.data.token,{expires:hour});
            cookies.set('userId',response.data.userId,{expires:hour});    
            cookies.set('companyId',response.data.companyId,{expires:hour});
            cookies.set('userType',response.data.userType,{expires:hour});    

            dispatch(user_action.setchangestatus(response.data.status));
          }else{
            let hour = new Date();
              hour.setTime(hour.getTime() + (60*60*1000));
              cookies.set('token',response.data.token,{expires:hour});
              cookies.set('userId',response.data.userId,{expires:hour});    
              cookies.set('userType',response.data.userType,{expires:hour});
              cookies.set('employeeId',response.data.employeeId,{expires:hour});    
                    dispatch(user_action.setchangestatus(response.data.status));

          }
        }
    
      }
    signup();
  }
}

export default signupThunk