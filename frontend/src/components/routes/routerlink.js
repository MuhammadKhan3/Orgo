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

import Navigate from "./navigate";
import Client from "../../pages/Client";

function RouterLink() {
  //This is Route where we include the Component and navigate the component
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Navigate Component={Login}/>} />
        <Route  path="/signup" element={<Navigate Component={Signup} />}/>
        <Route path="/forgot-password" element={<Forgot/>}/>

        <Route path="/profile" element={<Protect Component={Employee}/>}/>
        <Route path="/client" element={<Protect Component={Client}/>}/>

        <Route path="/profile" element={<Employee/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/protect" element={<Protect/>}/>
        <Route path="/client" element={<Client/>} />
      </Routes>
  );
}
export default RouterLink;