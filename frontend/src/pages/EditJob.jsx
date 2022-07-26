import React,{useEffect} from 'react'
import '../pages/createJob.css'
import EditJobCompo from '../components/editJob/EditJobCompo'
import { useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import Job from '../components/redux/thunk/job';

function CreateJob() {
  const dispatch=useDispatch();
  const {jobId}=useParams();
  console.log(jobId)
  useEffect(()=>{
    dispatch(Job(jobId))
  },[])
  return (
    <div className='main-create-profile'>
      <EditJobCompo/>
    </div>
  )
}

export default CreateJob