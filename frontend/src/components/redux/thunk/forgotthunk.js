import axios from 'axios'
import React from 'react'
import { user_action } from '../slice/userSlice'

const ForgotThunk = (obj) => {
  return (dispatch)=>{
    const forgot=async ()=>{
       const response=await axios.post('http://localhost:8000/find-email',obj);
       if(response.data.emailstatus==='two' || response.data.emailstatus==='null'){
        dispatch(user_action.setemailstatus(response.data.emailstatus));
       }
    }
    forgot();
  }
}

export default ForgotThunk;