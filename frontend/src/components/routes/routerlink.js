import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Forgot from "../forgot/forgot";
import Home from "../home";
import Portfolio from "../profile/porfolio";
import Profile from "../profile/profile";
import Login from "../registration/login";
import Employee from "../../pages/Employee";
import Signup from "../registration/signup"
import Protect from "./protect";
import Client from "../../pages/Client";

function RouterLink() {
  //This is Route where we include the Component and navigate the component
  return (
      <Routes>
        <Route path="/" element={<Protect Component={Home}/>} />
        <Route path="/login" element={<Login />} />
        <Route  path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<Forgot/>}/>
        <Route path="/profile" element={<Employee/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/protect" element={<Protect/>}/>
        <Route path="/client" element={<Client/>} />
      </Routes>
  );
}
export default RouterLink;