import axios from 'axios'
import React from 'react'
import { user_action } from '../slice/userSlice';
import { Cookies } from 'react-cookie'
const cookies=new Cookies();

// this thunk we verified the value
const VerifiedThunk = (obj,navigate) => {
  return async (dispatch)=>{
    const verify= async ()=>{
        const response=await axios.post('http://localhost:8000/verify-account',obj);
        console.log(response.data.authenticate)
        
        if(response.data.status==='one'){
          console.log('click')
           cookies.set('authenticate',response.data.authenticate);    
            dispatch(user_action.setchangestatus('one'))
            navigate('/');
        }else{
          dispatch(user_action.setmsg(response.data.msg))
        }

    }
    verify();
  }
}

export default VerifiedThunk