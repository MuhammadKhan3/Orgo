import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import { company_action } from '../slice/companySlice';
const cookies=new Cookies();
const FetchProposal = (jobId) => {
  return async (dispatch)=>{

         const token=cookies.get('token')
        return axios.post(`http://localhost:8000/proposal-length/${jobId}`,{
            headers: { authorization: `Bearer ${token}` }
        }).then((response)=>{
            console.log(response.data.prop_length)
            return response.data.prop_length;
        })

  
  }
}

export default FetchProposal