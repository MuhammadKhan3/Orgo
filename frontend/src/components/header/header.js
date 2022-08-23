import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { job_action } from '../redux/slice/jobSlice';
import {Cookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import FetchCompany from '../redux/thunk/FetchCompany'
const cookies=new Cookies();


const Header = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const picture=useSelector(state=>state.companySlice.picture);
    const active=useSelector(state=>state.jobSlice.activeState);
    useEffect(()=>{
      dispatch(FetchCompany())
      dispatch(job_action.setactiveState(cookies.get('active_state')))
    },[])

    const logouthandler=()=>{
      if(cookies.get('userType')==='freelancer' || cookies.get('userType')==='company'){
         cookies.remove('companyId')
      }else{
        cookies.remove('employeeId')
      }
      
      cookies.remove('userId')
      cookies.remove('token')
      cookies.remove('authenticate')
      cookies.remove('userType')
      cookies.remove('authorize');
      cookies.remove('active_state');
      navigate('/login')
    }

    const messagehandler=()=>{

        // const userId=cookies.get('userId');
        // const userType=cookies.get('userType');
        // let companyId;
        // if(userType==='company' || userType==='company'){
        //   companyId=cookies.get('companyId')
        // }
        // const data={
        //   socketId:socket.id,
        //   userId:userId,
        //   userType:userType,
        //   companyId:companyId,
        // }
        // socket.emit("click",data);
    }



    const refreshehandler=()=>{
      setTimeout(()=>{
        window.location.reload(false);
      }, 10);
    }

  return (<>
  <div className="navbar bg-gradient-to-r from-pink-500 to-yellow-500">
  <div className="flex-1 inline-block w-[80px] text-white">
    <h2 className=" text-[45px] text-white w-[60px] float-left ">Orgo</h2>
    <ul className='flex flex-row   mt-[-15px] !ml-[190px] space-x-2  '>
        <Link to='/' onClick={refreshehandler}>
          <li className={`text-[14px]  btn btn-ghost w-[90px] ${active==='project' ? 'btn-active text-white' :''}`} onClick={()=>{cookies.set('active_state','project')}}>Dashboard</li>
        </Link>
        {cookies.get('userType')==='employee'  &&
          <Link to='/job-list' onClick={refreshehandler}>
            <li className={` text-[14px] btn btn-ghost w-[90px] ${active==='job-list' ? 'btn-active text-white' :''}`} onClick={()=>{cookies.set('active_state','job-list')}}>Job</li>
          </Link>
        }
        <Link to='/message' onClick={refreshehandler}>
          <li className={` text-[14px] btn btn-ghost w-[90px] ${active==='message' ? 'btn-active text-white' :''}`} onClick={()=>{cookies.set('active_state','message')}}>Message</li>
        </Link>
        {cookies.get('userType')==='employee' &&
        <Link to='/create-job' onClick={refreshehandler} >
          <li className={` text-[14px] btn btn-ghost w-[130px] ${active==='create-job' ? 'btn-active text-white' :''}`} onClick={()=>{cookies.set('active_state','create-job')}}>create Job</li>
        </Link>
        }
        {!cookies.get('userId') && !cookies.get('token')  &&
          <Link to='login'>
            <li className='btn btn-ghost text-[18px] w-[90px]' >Login</li>
          </Link>
        }
    </ul>
  </div>  <div className="flex-none gap-[100px] mt-3">
    {/* <div className="form-control">
      <input type="text" placeholder="Search Projects" className="input input-bordered w-[400px]" />
    </div> */}
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={picture.length>0 ? `http://localhost:8000/${picture}`  :'https://placeimg.com/80/80/people'} />
        </div>
      </label>
      <ul tabIndex="0" className="mt-3  shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-60 ">
      <Link to='/profile' onClick={refreshehandler}>
        <li >
          <a className="justify-between">
            Profile
          </a>
        </li>
      </Link>
      {cookies.get('userType')==='employee' &&
      <Link to='/create-job'>
        <li className='mt-[-4px]'><a>create Job</a></li>
      </Link>
      }
        <li className='mt-[-4px]' onClick={logouthandler}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</>)
}

export default Header