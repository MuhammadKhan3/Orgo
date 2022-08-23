import { useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import Header from "../header/header";
import freelancerThunk from "../redux/thunk/freelancerThunk";
import axios from 'axios';
import { Cookies } from "react-cookie";
const cookies=new Cookies();
const  Freelancer=()=>{
   const freelancers=useSelector(state=>state.companySlice.freelancers);
   const userType=cookies.get('userType') 
   const [active,setactive] =useState((userType==='company' || userType==='freelancer') ? 'new' :'approve'); 
   const dispatch=useDispatch();
   useEffect(()=>{
    dispatch(freelancerThunk(active))
   },[active])

   const approvehandler=(freelancerId)=>{
    const token=cookies.get('token');
    axios.post('http://localhost:8000/approve',{
      freelancerId:freelancerId
    })
    .then((response)=>{
      setactive('approve')
      console.log(response)
    })
    console.log(freelancerId)
   }
   const rejecthandler=(freelancerId)=>{
      axios.post('http://localhost:8000/reject',{
        freelancerId:freelancerId
      })
      .then((response)=>{
        window.location.reload(false);
      })
   }

   if(active==='new' && userType=='company' ){ 
    return (
    <>
    <div  className="h-[673px] w-auto ml-[20px] -z-[999]" >
    <h1 className="text-[20px] text-lightgray font-bold ">Organization</h1>
    <div className="overflow-x-auto    bg-white">
    <div className="flex flex-row ml-[30px] space-x-5 mt-[30px]">
    {/*  */}
 
      <h3 className={`${active==='new' &&' border-b-2 border-green-500'} cursor`} onClick={()=>{setactive('new')}}>New</h3>    
      
      <h3 className={`${active==='approve' &&' border-b-2 border-green-500'} `}  onClick={()=>{setactive('approve')}}>Approve</h3>
    </div>
    <table className="table  mt-[30px] w-full ">
      <thead>
        <tr >
          <th className="!text-[13px]">Srn</th>
          <th className="!text-[13px]">Name</th>
          <th className="!text-[13px]">Type</th>
          <th className="!text-[13px]">Approval</th>
        </tr>
      </thead>
      <tbody>
        {freelancers.length>0 && freelancers.map((freelancer,i)=>{
          return (        <tr  className="hover" key={i}>
          <th>{i+1}</th>
          <td>{freelancer.firstname}{freelancer.lastname && freelancer.lastname}</td>
          <td>{freelancer.userType}</td>
          <td><button className="btn bg-white text-red-400  !border-red-400 hover:text-white hover:bg-red-400" onClick={()=>{rejecthandler(freelancer._id)}}>reject</button> <button className="btn bg-white text-green-500  !border-green-500 hover:text-white hover:bg-green-500 ml-[5px]" onClick={()=>{approvehandler(freelancer._id)}}>Members</button></td>
        </tr>
        )
        })}
      </tbody>
    </table>
  </div>
  </div>
  </>)
  }
  else if(active==='approve' || (active==='new' && userType==='freelancer'))  { 
  return (
    <>
    <div  className="h-[673px] ml-[20px]">
    <h1 className="text-[20px] text-lightgray font-bold ">Organization</h1>
    <div className="overflow-x-auto    bg-white">
    <div className="flex flex-row ml-[30px] space-x-5 mt-[30px]">
    {/*  */}
      {( userType==='company') &&
      <h3 className={`${active==='new' &&' border-b-2 border-green-500'} cursor`} onClick={()=>{setactive('new')}}>New</h3>
      }
      <h3 className={`${active==='approve' &&' border-b-2 border-green-500'} `}  onClick={()=>{setactive('approve')}}>Members</h3>
    </div>
    <table className="table  mt-[30px] w-full ">
      <thead>
        <tr >
          <th className="!text-[13px]">Srn</th>
          <th className="!text-[13px]">Name</th>
          <th className="!text-[13px]">Type</th>
          <th className="!text-[13px]">Approved</th>
        </tr>
      </thead>
      <tbody>
      {freelancers.map((freelancer,i)=>{
        return   (<tr  className="" key={i}>
        <th>{i+1}</th>
        <td>{freelancer.firstname}{freelancer.lastname && freelancer.lastname}</td>
        <td>{freelancer.userType}</td>
        <td><span style={{backgroundColor:'#6CC417',color:'white', width:'40px',padding:'11px',width:'80px',borderRadius:'10px'}}> Approved</span></td>
      </tr> )
      })}
      </tbody>
    </table>
  </div>
  </div>
  </>)
  }
}

export default Freelancer;