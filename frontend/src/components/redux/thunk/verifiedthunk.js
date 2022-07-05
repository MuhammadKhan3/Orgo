import axios from 'axios'
import React from 'react'
import { user_action } from '../slice/userSlice';

const VerifiedThunk = (obj,navigate) => {
  return async (dispatch)=>{
    const verify= async ()=>{
        const response=await axios.post('http://localhost:8000/verify-account',obj);
        console.log(response)
        if(response.data.status==='one'){
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