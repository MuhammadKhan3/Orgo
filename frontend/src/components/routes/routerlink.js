import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Forgot from "../forgot/forgot";
import Home from "../home";
import Portfolio from "../profile/porfolio";
import Profile from "../profile/profile";
import Login from "../registration/login";
import { Cookies } from "react-cookie";
import Employee from "../../pages/Employee";
import Signup from "../registration/signup"
import Protect from "./protect";

import Navigate from "./navigate";
import Client from "../../pages/Client";

const cookies=new Cookies();

function RouterLink() {
  const userType=cookies.get('userType');
  //This is Route where we include the Component and navigate the component
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Navigate Component={Login}/>} />
        <Route  path="/signup" element={<Navigate Component={Signup} />}/>
        <Route path="/forgot-password" element={<Forgot/>}/>
<<<<<<< HEAD

        <Route path="/profile" element={<Employee/>}/>
        <Route path="/client" element={<Protect Component={Client}/>}/>
        <Route path="/profile" element={<Protect Component={Employee}/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/protect" element={<Protect/>}/>
        <Route path="/client" element={<Client/>} />
=======
        <Route path="/profile" element={<Protect Component={Employee}/>}/>
        <Route path="/client" element={<Protect Component={Client}/>}/>
  
>>>>>>> 6888310cad4996692d31c7bdb84e7d699c69226f
      </Routes>
  );
}
export default RouterLink;