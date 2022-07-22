import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import { company_action } from '../slice/companySlice';
const cookies=new Cookies();
const FetchEmployee = () => {
  return async (dispatch)=>{
    const token=cookies.get('token')
    const employeeId=cookies.get('employeeId')
    console.log(employeeId)
    const FetchProfile=async ()=>{
        const response=await axios.post(`http://localhost:8000/get-employee/${employeeId}`,{
            headers: { authorization: `Bearer ${token}` }
        });
        console.log(response.data.userId.email)
        const lastname=response.data.userId.lastname!==undefined ? response.data.userId.lastname :'';
        dispatch(company_action.setemail(response.data.userId.email));
        dispatch(company_action.setname(response.data.userId.firstname+"  "+lastname));
        dispatch(company_action.setpicture(response.data.picture));
        dispatch(company_action.settimezone(response.data.timezone));
        dispatch(company_action.setcountry(response.data.country));
        dispatch(company_action.setcompanyname(response.data.companyName));
        dispatch(company_action.setphone(response.data.phone));
        dispatch(company_action.setownername(response.data.ownerName));

        // dispatch(company_action.setrate(response.data.rate));
    }
    FetchProfile();
  }
}

export default FetchEmployee