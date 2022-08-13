import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import { company_action } from '../slice/companySlice';
import { job_action } from '../slice/jobSlice';
const cookies=new Cookies();
const Job = (jobId) => {
  return async (dispatch)=>{
    const token=cookies.get('token');
    const Fetchjob=async ()=>{

        const response=await axios.post(`http://localhost:8000/get-job/${jobId}`,{
            headers: { authorization: `Bearer ${token}` }
        });
        console.log(response.data)
        dispatch(job_action.setheading(response.data.job.heading));
        dispatch(job_action.setdescription(response.data.job.description));
        dispatch(job_action.setfiles(response.data.job.file));
        dispatch(job_action.setcategory(response.data.job.category));
        dispatch(job_action.setskill(response.data.job.skills));
        dispatch(job_action.setminimum(response.data.job.budget.min));
        dispatch(job_action.setmaximum(response.data.job.budget.max));
        dispatch(job_action.setcreatedat(response.data.job.createdAt));



    }
    Fetchjob();
  }
}

export default Job