import * as React from "react";
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

const cookies = new Cookies();

function RouterLink() {
  const userType = cookies.get("userType");
  console.log(userType);

  //This is Route where we include the Component and navigate the component
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Navigate Component={Login} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<Forgot />} />
      {userType === "company" || userType === "freelancer" ? (
        <Route
          path="/profile"
          element={<Protect Component={FreelancerCompany} />}
        />
      ) : (
        <Route
          path="/profile"
          element={<Protect Component={ClientCompany} />}
        />
      )}
      <Route path="/project" element={<Search />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/edit-job" element={<EditJob/>} />
      <Route path="/job-list" element={<JobList/>} />
    </Routes>
  );
}
export default RouterLink;
