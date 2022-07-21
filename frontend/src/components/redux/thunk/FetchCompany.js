import React from 'react'
import axios from 'axios'
import {Cookies} from 'react-cookie'
import { company_action } from '../slice/companySlice';
const cookies=new Cookies();
const FetchCompany = () => {
  return async (dispatch)=>{
    const token=cookies.get('token')
    const companyId=cookies.get('companyId')
    const FetchProfile=async ()=>{
        const response=await axios.post(`http://localhost:8000/company-profile/${companyId}`,{
            headers: { authorization: `Bearer ${token}` }
        });
        console.log(response)
        dispatch(company_action.setcompanyname(response.data.companyId.companyName));
        dispatch(company_action.settimezone(response.data.companyId.timezone));
        dispatch(company_action.setcountry(response.data.companyId.country));
        dispatch(company_action.setpicture(response.data.picture));
        dispatch(company_action.setrate(response.data.rate));
        dispatch(company_action.setlanguages(response.data.languages));
        dispatch(company_action.setdegree(response.data.education.degree));
        dispatch(company_action.setdegreelevel(response.data.education.degreelevel));
        dispatch(company_action.setschool(response.data.education.school));
        dispatch(company_action.setsdescription(response.data.education.description));
        dispatch(company_action.sethourswork(response.data.hourworking));
        dispatch(company_action.settitle(response.data.title));
        dispatch(company_action.setdescription(response.data.description));
        dispatch(company_action.setskills(response.data.skills));









    }
    FetchProfile();
  }
}

export default FetchCompany