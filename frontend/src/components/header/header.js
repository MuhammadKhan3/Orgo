import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Header = () => {
    const [acitve,setactivebtn]=useState('');
  return (<>
  <div className="navbar bg-gradient-to-r from-pink-500 to-yellow-500">
  <div className="flex-1 inline-block w-[60px] text-white">
    <h2 className=" text-[45px] text-whitew-[60px] float-left ">Orgo</h2>
    <ul className='flex flex-row  float-left mt-5 ml-[300px] space-x-4 '>
        <li className={`btn btn-ghost text-[18px] ${acitve==='dashboard' ? 'btn-active' :''}`} onClick={()=>{setactivebtn('dashboard')}}>Dashboard</li>
        <li className={`btn  btn-ghost text-[18px] ${acitve==='projects' ? 'btn-active' :''}`} onClick={()=>{setactivebtn('projects')}}>Projects</li>
        <li className={`btn btn-ghost text-[18px] ${acitve==='message' ? 'btn-active' :''}`} onClick={()=>{setactivebtn('message')}}>Message</li>
        <Link to='login'>
          <li className='btn btn-ghost text-[18px]' >Login</li>
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