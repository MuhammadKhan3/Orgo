import axios from 'axios'
import React from 'react'
import { user_action } from '../slice/userSlice'

// Password and confirmPassword value send the server
const PasswordThunk = (obj,navigate) => {
  return async (dispatch)=>{
    const password=async ()=>{
        const response=await axios.post('http://localhost:8000/password-change',obj);
        if(response.data.flag){
            navigate('/login');
            dispatch(user_action.setemailstatus('null'));
        }
    }

    password();
  }
}

export default PasswordThunk;