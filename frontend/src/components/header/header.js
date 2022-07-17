import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Header = () => {
    const [acitve,setactivebtn]=useState('');
  return (<>
  <div className="navbar bg-gradient-to-r from-pink-500 to-yellow-500">
  <div className="flex-1 inline-block w-[80px] text-white">
    <h2 className=" text-[45px] text-white w-[60px] float-left ">Orgo</h2>
    <ul className='flex flex-row   mt-5 !ml-[190px] space-x-2  '>
        <li className={` text-[14px] btn btn-ghost w-[90px]  ${acitve==='dashboard' ? 'btn-active text-white' :''}`} onClick={()=>{setactivebtn('dashboard')}}>Dashboard</li>
        <li className={`text-[14px]  btn btn-ghost w-[90px] ${acitve==='projects' ? 'btn-active text-white' :''}`} onClick={()=>{setactivebtn('projects')}}>Projects</li>
        <li className={` text-[14px] btn btn-ghost w-[90px] ${acitve==='message' ? 'btn-active text-white' :''}`} onClick={()=>{setactivebtn('message')}}>Message</li>
        <Link to='login'>
          <li className='btn btn-ghost text-[18px] w-[90px]' >Login</li>
        </Link>
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
      <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
      <Link to='/profile'>
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
      </Link>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
</>)
}

export default Header