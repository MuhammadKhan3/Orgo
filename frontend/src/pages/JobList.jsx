import React,{useEffect} from "react";
import "../pages/jobList.css";
import Button from '../components/button/Button'
import {job_action} from '../components/redux/slice/jobSlice';
import {Cookies} from 'react-cookie';
import axios from 'axios'
import { formatDistance, subDays } from 'date-fns'
import {useSelector,useDispatch} from 'react-redux';
import { Link } from "react-router-dom";

const cookies=new Cookies();
function JobList() {
  const dispatch=useDispatch();
  const jobs=useSelector(state=>state.jobSlice.jobs)
  console.log(jobs)
  useEffect(()=>{
    const Joblist=()=>{
      const token=cookies.get('token');
      const employeeId=cookies.get('employeeId');
      axios.post('http://localhost:8000/get-employeeJob',{
        employeeId,
        headers:{
          authorization:"Bearer "+token,
        }
      })
      .then((response)=>{
        dispatch(job_action.setjobs(response.data.jobs))
      })
    }
    Joblist();
  },[])

  return (
    <div className="main-job-list-container">
      <div className="job-list-sub-container">
        <div className="job-list-header">
          <h1 style={{ fontSize: "1.2em", fontWeight: "500",color:"#656565" }}>Job List</h1>
        </div>
        <ul style={{marginLeft:"30px"}}>

          <li style={{color:"#656565"}}>Jobs</li>

          {/* <li style={{color:"#656565", fontWeight:"400"}}>Recent Job</li> */}

        </ul>
        <hr />
        {jobs.map((job)=>{
          return <>
            <div className="job-list-body">
              <h2 style={{ fontSize: "1em", fontWeight: "500",color:"#656565" }}>{job.category}</h2>
              <p style={{marginTop:"5px"}}>{formatDistance( new Date(job.createdAt), new Date(), { addSuffix: true })}</p>              
              <p style={{marginTop:"5px"}}>Budget Price {job.budget.min}$ - {job.budget.max}$</p>
              <p style={{marginTop:"5px"}}>{job.description}</p>
              <p style={{backgroundColor:job.status==='active' ? '#6CC417' :'#DE3163',color:'white',padding:'5px',width:'80px',borderRadius:'10px',paddingLeft:'10px'}}>{job.status}</p>
            </div>
            <div className="job-list-proposal">
              <p>Proposals : 15 to 20</p>
              <div className="job-list-button">
                <Link to={`/edit-job/${job._id}`}>
                   <Button content="Edit"/>
                </Link>
                <Link to={`/proposal-list/${job._id}`}>
                   <Button content="Puposal"/>
                </Link>
              </div>
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  );
}

export default JobList;
