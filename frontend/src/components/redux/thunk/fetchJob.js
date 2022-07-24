import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import { company_action } from '../slice/companySlice';
import { job_action } from '../slice/jobSlice';
const cookies=new Cookies();
const FetchJob = () => {
  return async (dispatch)=>{
    const token=cookies.get('token');
    const userId=cookies.get('userId')
    const Fetchjob=async ()=>{
        const response=await axios.post(`http://localhost:8000/get-jobs`,{
            userId,
            headers: { authorization: `Bearer ${token}` }
        });
        console.log(response.data);
        dispatch(job_action.setjobs(response.data.jobs))
        dispatch(job_action.setsearches(response.data.searches))

    }
    Fetchjob();
  }
}

export default FetchJob