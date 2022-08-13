import React from 'react'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { company_action } from '../slice/companySlice';
// import 
const cookies=new Cookies();

const freelancerThunk = (active) => {
  return async (dispatch)=>{
      const token=cookies.get('token');
      const companyId=cookies.get('companyId');
    if(active==='new'){
        const freelancer=async ()=>{
            const response=await axios.post(`http://localhost:8000/get-freelancer/${companyId}`,{
                headers:{
                    authorization:'Bearer '+token,
                }
            });
            dispatch(company_action.setfreelancers(response.data.freelancers))
            console.log(response)
        }
        freelancer();
    }else if(active==='approve'){
        const freelancer=async ()=>{
            const response=await axios.post(`http://localhost:8000/approve-freelancer/${companyId}`,{
                headers:{
                    authorization:'Bearer '+token,
                }
            });
            dispatch(company_action.setfreelancers(response.data.freelancers))
            console.log(response)
        }
        freelancer();
    }

  }
}

export default freelancerThunk