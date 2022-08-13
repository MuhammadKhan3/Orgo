import React,{useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Forgot from "../forgot/forgot";
import Home from "../home";
import Portfolio from "../profile/porfolio";
import Profile from "../profile/profile";
import Login from "../registration/login";
import { Cookies } from "react-cookie";
import FreelancerCompany from "../../pages/Employee";
import Signup from "../registration/signup";
import Protect from "./protect";
import Navigate from "./navigate";
import ClientCompany from "../../pages/Client";
import Search from "../../pages/Search";
import CreateJob from "../../pages/CreateJob";
import EditJob from '../../pages/EditJob';
import JobList from "../../pages/JobList";
import ProposalList from '../../pages/ProposalList';
import SubmitProposal from "../../pages/SubmitProposal";
import ChatPage from "../../pages/ChatPage";
import Freelancer from "../freelancer/freelancer";

const cookies = new Cookies();

function RouterLink() {
  const userType = cookies.get("userType");
  const authorize = cookies.get("authorize");
  console.log(typeof authorize)
  //This is Route where we include the Component and navigate the component
  return (
    <Routes>
      <Route path="/login" element={<Navigate Component={Login} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<Forgot />} />
      {authorize==="true" && <>
      {userType === "employee"  ? (
        <>
        <Route path="/profile" element={<Protect Component={ClientCompany} />}/>
        <Route path="/create-job" element={<Protect Component={CreateJob} />} />
        <Route path="/edit-job/:jobId" element={<Protect Component={EditJob} />}/>
        <Route path="/job-list" element={<Protect Component={JobList}/>} />
        <Route path="/proposal-list/:jobId" element={<ProposalList/>} />
        <Route path="/proposal-list" element={<ProposalList/>} />

       </>) : (
         <>
          {userType==='company' &&
           <Route path="/freelancer-list" element={<Freelancer/>} />
          }
         <Route path="/profile" element={<Protect Component={FreelancerCompany} />}/>
         <Route extact path="/submit-proposal/:jobId" element={<SubmitProposal/>} />
         </>
         )}
         <Route path="/message" element={<Protect Component={ChatPage}/>} />
         <Route path="/project" element={<Protect Component={Search} />} />
         </>}
      <Route path="/" element={<Home />} />


    </Routes>
  );
}
export default RouterLink;
