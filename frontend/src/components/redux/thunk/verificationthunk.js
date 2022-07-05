import axios from 'axios'
import React from 'react'
import { user_action } from '../slice/userSlice';



// This thunk we verified the value
const VerificationThunk = (obj,navigate) => {
  return async (dispatch)=>{
    const verify= async ()=>{
        const response=await axios.post('http://localhost:8000/verified',obj);
        if(response.data.emailstatus==='three' && !obj.signup){
            dispatch(user_action.setemailstatus(response.data.emailstatus))
        }else{
          dispatch(user_action.setchangestatus('one'))
          navigate('/');
        }

    }
    verify();
  }
}

export default VerificationThunk