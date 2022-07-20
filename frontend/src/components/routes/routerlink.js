import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Forgot from "../forgot/forgot";
import Home from "../home";
import Portfolio from "../profile/porfolio";
import Profile from "../profile/profile";
import Login from "../registration/login";
import Employee from "../../pages/Employee";
import Signup from "../registration/signup"
import Test from "../test";
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

      </Routes>
  );
}
export default RouterLink;