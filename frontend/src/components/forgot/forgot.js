import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Fade from "react-reveal/Fade";
import Typewriter from "typewriter-effect";
import { useDispatch, useSelector } from "react-redux";
import './forgot.css'
import ForgotThunk from "../redux/thunk/forgotthunk";
import { useNavigate } from "react-router-dom";
import { user_action } from "../redux/slice/userSlice";
import VerificationThunk from "../redux/thunk/verificationthunk";
import PasswordThunk from "../redux/thunk/passwordthunk";

const Forgot= ()=> {
  const emailstatus=useSelector(state=>state.userSlice.emailstatus);  
  const email=useSelector(state=>state.userSlice.email);  
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const validationSchema=Yup.object().shape({
    email:Yup.string().email('Invalid Email').required('Required email'),
    password:Yup.string().min(8,'Too Short').max(20,'Too Long').required('Required password'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],"Password does not match")
    .min(8,'Too Short').max(20,'Too Long').required('Required password'),
    verification:Yup.string().min(5,'Minimum Length is 6').max(7,'Maximum Length is 6').required("Required Verification"), 
  });

  const formik=useFormik({
    initialValues:{
      email:'',
      password:'',
      verification:'',
      confirmPassword:'',
    },
    validationSchema:validationSchema
  })
  const submithandler=(e)=>{
    e.preventDefault();
    if(formik.values.email){
      dispatch(user_action.setemail(formik.values.email));
      dispatch(ForgotThunk({email:formik.values.email},navigate));      
  }
    
  }

//   In this handler we send the verification code and email
  const verificationhandler=(e)=>{
    e.preventDefault();
    if(formik.values.verification){
        dispatch(VerificationThunk({email:email,code:formik.values.verification}))
    }
  }
//   close the verification handler

  //In this handler we send the password
  const resethandler=(e)=>{
    e.preventDefault();
    if(formik.values.password===formik.values.confirmPassword){
        dispatch(PasswordThunk({email:email,password:formik.values.password},navigate));
    }
  }
//   close password handler

  if(emailstatus==='one' || emailstatus==='null' ){
    
    return ( <>
        <section className="bg-slate-700 lg:w-screen     lg:h-screen   absolute top-0 left-0 sm:w-screen sm:h-[42rem] md:h-[42rem] tablet:w-screen">
            <div className="flex flex-row  bg-white rounded-lg relative top-20  z-10  h-auto w-auto sm:w-screen md:w-screen  lg:w-[60rem] lg:ml-[400px] sm:border-[1px] sm:border-pink-400 ">
                <div className="bg-white rounded-t-lg rounded-b-lg w-[30rem]">
                <form className="" onSubmit={submithandler}>
                    <legend className="mt-[170px] ml-[120px] text-pink-500 text-3xl font-bold">
                    Forgot Password
                    </legend>
                    <br />
                    <br />
                    <input
                    type="text"
                    className="bg-slate-200 opacity-50 ml-[110px] w-[260px] h-10 outline-cyan-500"
                    placeholder="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    value={formik.values.email}
                    />
                    {emailstatus==='null' ?<div className="text-red-400 ml-[110px]">Email not exist</div>:''}    
                    {formik.errors.email && formik.touched.email ? <div className="text-red-400 ml-[110px]">{formik.errors.email}</div> :''}
                    <button type="submit" className="ml-[180px] mt-4 bg-pink-600 hover:bg-pink-900 rounded-full text-white block px-[45px] py-1 focus:bg-white focus:border-[1px] focus:border-pink-500 focus:text-black ">
                      Forgot
                    </button>
                </form>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-r-lg  md:w-[30rem] sm:w-[400px]   hidden lg:block ">
                <div className="mt-[220px]">
                    <Fade right>
                    <h1 className="text-white text-[30px] text-bold ml-36">
                        <Typewriter
                        className
                        onInit={(typewriter) => {
                            typewriter
                            .typeString("Forgot")
                            .pauseFor(2000)
                            .deleteAll()
                            .typeString("Password Thank you")
                            .start();
                        }}
                        />
                    </h1>
                    </Fade>
                    <Fade left>
                    <p className="text-white text-justify w-96 ml-16">
                        A good example of a paragraph contains a topic sentence, details
                        and a conclusion. 'There are many different kinds of animals
                        that live in China. Tigers and leopards are animals that live in
                        China's forests in the north
                    </p>
                    </Fade>
                </div>
                </div>
            </div>
        </section>
      </>)
  }else if(emailstatus==='two'){
    return ( <>
        <section className="bg-slate-700 h-screen w-screen    absolute top-0 left-0 ">
            <div className=" flex flex-row  bg-white rounded-lg h-[40rem] w-[60rem] relative top-20 left-[400px] z-10 ">
                <div className="bg-white rounded-t-lg rounded-b-lg w-[30rem]">
                <form className="" onSubmit={verificationhandler}>
                    <legend className="mt-[170px] ml-[120px] text-pink-500 text-3xl font-bold">
                      Verification
                    </legend>
                    <br />
                    <br />

                    <input
                    type="text"
                    pattern="\d*"
                    maxLength="6"
                    className="bg-slate-200 opacity-50 ml-[110px] w-[260px] h-10 outline-cyan-500"
                    placeholder="verification"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="verification"
                    value={formik.values.verification}
                    />
    
                    {formik.errors.verification && formik.touched.verification ? <div className="text-red-400 ml-[110px]">{formik.errors.verification}</div> :''}
                    <button type="submit" className="ml-[180px] mt-4 bg-pink-600 hover:bg-pink-900 rounded-full text-white block px-[45px] py-1 focus:bg-white focus:border-[1px] focus:border-pink-500 focus:text-black ">
                      Verify
                    </button>
                </form>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-r-lg  w-[30rem]">
                <div className="mt-[220px]">
                    <Fade right>
                    <h1 className="text-white text-[30px] text-bold ml-36">
                        <Typewriter
                        className
                        onInit={(typewriter) => {
                            typewriter
                            .typeString("Forgot")
                            .pauseFor(2000)
                            .deleteAll()
                            .typeString("Password Thank you")
                            .start();
                        }}
                        />
                    </h1>
                    </Fade>
                    <Fade left>
                    <p className="text-white text-justify w-96 ml-16">
                        A good example of a paragraph contains a topic sentence, details
                        and a conclusion. 'There are many different kinds of animals
                        that live in China. Tigers and leopards are animals that live in
                        China's forests in the north
                    </p>
                    </Fade>
                </div>
                </div>
            </div>
        </section>
      </>)
  }else if(emailstatus==='three'){
    return ( <>
        <section className="bg-slate-700 h-screen w-screen    absolute top-0 left-0 ">
            <div className=" flex flex-row  bg-white rounded-lg h-[40rem] w-[60rem] relative top-20 left-[400px] z-10 ">
                <div className="bg-white rounded-t-lg rounded-b-lg w-[30rem]">
                <form className="" onSubmit={resethandler}>
                    <legend className="mt-[170px] ml-[120px] text-pink-500 text-3xl font-bold">
                    Reset Password
                    </legend>
                    <br />
                    <br />
                    <input
                    type="text"
                    className="bg-slate-200 opacity-50 ml-[110px] w-[260px] h-10 outline-cyan-500"
                    placeholder="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    value={formik.values.password}
                    />

                    <input
                    type="text"
                    className="bg-slate-200 opacity-50 ml-[110px] mt-[30px] w-[260px] h-10 outline-cyan-500"
                    placeholder="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    />

                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="text-red-400 ml-[110px]">{formik.errors.confirmPassword}</div> :''}
                    <button type="submit" className="ml-[180px] mt-4 bg-pink-600 hover:bg-pink-900 rounded-full text-white block px-[45px] py-1 focus:bg-white focus:border-[1px] focus:border-pink-500 focus:text-black ">
                    Reset
                    </button>
                </form>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-r-lg  w-[30rem]">
                <div className="mt-[220px]">
                    <Fade right>
                    <h1 className="text-white text-[30px] text-bold ml-36">
                        <Typewriter
                        className
                        onInit={(typewriter) => {
                            typewriter
                            .typeString("Forgot")
                            .pauseFor(2000)
                            .deleteAll()
                            .typeString("Password Thank you")
                            .start();
                        }}
                        />
                    </h1>
                    </Fade>
                    <Fade left>
                    <p className="text-white text-justify w-96 ml-16">
                        A good example of a paragraph contains a topic sentence, details
                        and a conclusion. 'There are many different kinds of animals
                        that live in China. Tigers and leopards are animals that live in
                        China's forests in the north
                    </p>
                    </Fade>
                </div>
                </div>
            </div>
        </section>
      </>);
  }
  


};

export default Forgot;
