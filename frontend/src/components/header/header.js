import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {Cookies} from 'react-cookie';
import { useNavigate } from "react-router-dom";
const cookies=new Cookies();

const Header = () => {
    const navigate=useNavigate();
    const [acitve,setactivebtn]=useState('');
    
    const logouthandler=()=>{
      if(cookies.get('userType')==='freelancer' || cookies.get('userType')==='freelancer'){
         cookies.remove('companyId')
      }else{
        cookies.remove('employeeId')
      }
      
      cookies.remove('userId')
      cookies.remove('token')
      cookies.remove('authenticate')
      cookies.remove('userType')
      navigate('/login')
    }
  return (<>
  <div className="navbar bg-gradient-to-r from-pink-500 to-yellow-500">
  <div className="flex-1 inline-block w-[80px] text-white">
    <h2 className=" text-[45px] text-white w-[60px] float-left ">Orgo</h2>
    <ul className='flex flex-row   mt-[-15px] !ml-[190px] space-x-2  '>
        <li className={` text-[14px] btn btn-ghost w-[90px]  ${acitve==='dashboard' ? 'btn-active text-white' :''}`} onClick={()=>{setactivebtn('dashboard')}}>Dashboard</li>
        <Link to='/project'>
          <li className={`text-[14px]  btn btn-ghost w-[90px] ${acitve==='projects' ? 'btn-active text-white' :''}`} onClick={()=>{setactivebtn('projects')}}>Projects</li>
        </Link>
        <li className={` text-[14px] btn btn-ghost w-[90px] ${acitve==='message' ? 'btn-active text-white' :''}`} onClick={()=>{setactivebtn('message')}}>Message</li>
        {!cookies.get('userId') && !cookies.get('token')  &&
          <Link to='login'>
            <li className='btn btn-ghost text-[18px] w-[90px]' >Login</li>
          </Link>
        }
    </ul>
  </div>  <div className="flex-none gap-[100px] mt-3">
    <div className="form-control">
      <input type="text" placeholder="Search Projects" className="input input-bordered w-[400px]" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabIndex="0" className="mt-3  shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-60 ">
      <Link to='/profile'>
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
      </Link>
        <li className='mt-[-4px]'><a>Settings</a></li>
        <li className='mt-[-4px]' onClick={logouthandler}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</>)
}

export default Header