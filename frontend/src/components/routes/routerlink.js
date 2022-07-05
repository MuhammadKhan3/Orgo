import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Forgot from "../forgot/forgot";
import Home from "../home";
import Login from "../registration/login";
import Signup from "../registration/signup"
import Test from "../test";

function RouterLink() {
  //This is Route where we include the Component and navigate the component
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route  path="/signup" element={<Signup/>}/>
        <Route path="/forgot-password" element={<Forgot/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
  );
}
export default RouterLink;