import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Fade from "react-reveal/Fade";
import Slide  from "react-reveal/Slide";
import Typewriter from "typewriter-effect";
import { Link, useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { useDispatch, useSelector } from "react-redux";
import Googlethunk from "../redux/thunk/googlethunk";
import FacebookThunk from "../redux/thunk/facebookthunk";
import './login.css'
import axios from "axios";
import LoginThunk from "../redux/thunk/loginthunk";

const Login = () => {
  const flag=useSelector(state=>state.userSlice.flag);
  const data=useSelector(state=>state.userSlice.data);

  const dispatch=useDispatch();
  const [popup,setpopup]=useState(false);
  const [email,setemail]=useState('');
  const [continuebtn,setcontinuebtn]=useState(false);
  const [showpassword,setpassword]=useState('password');
  const [userID,setuserID]=useState('');
  const [accessToken,setaccessToken]=useState('');


    const navigate=useNavigate();
  //Google handler we send the message to database 
  const clickhandler=(response)=>{
    dispatch(Googlethunk(response.credential,response.clientId,navigate));
  }
  // close the google handler
  
  //password handler
  const showpasswordhandler=()=>{
    if(showpassword==='password'){
      setpassword('text')
    }else{
      setpassword('password')
    }
  }
  //close show password handler

  //Formik Library
  const validationSchema=Yup.object().shape({
    email:Yup.string().email('Invalid Email').required('Required email'),
    password:Yup.string().min(8,'Too Short').max(20,'Too Long').required('Required password'), 
  });

  const formik=useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema:validationSchema
  })
  //close Formik Library


  // In this hook we render the google button
  useEffect(()=>{
    /* global google*/
   const google=window.google;
      if(google){
          /* global google*/
     google.accounts.id.initialize({
      client_id:'821241871483-ah0oc16fcbhtedm026m7h7qpk292f8f1.apps.googleusercontent.com',
      callback:clickhandler
    })
         google.accounts.id.renderButton(
      document.getElementById('loginbutton'),
      {theme:'outline',size:'large',shape:'pill',text: "signin",width: 100}
    )  
    google.accounts.id.prompt();
    }   
   },[])
  //  close google button

  // Facebook authetication handler
   const responseFacebook =async (response) => {
        setuserID(response.userID);
        setaccessToken(response.accessToken);
        console.log(userID,accessToken);
        if(response.email){
          console.log(userID)
          console.log('hi')
          dispatch(FacebookThunk(response.accessToken,response.userID,navigate,''));
        }else{
          console.log('else')
          // let person = prompt("Please enter your name:", "Harry Potter");
          // alert('email not exist')
          const obj={
            clientId:response.userID,
          }
          axios.post('http://localhost:8000/facebookcheck',obj)
          .then(responses=>{
            const flag=responses.data.flag;
            if(flag===true){
              dispatch(FacebookThunk(response.accessToken,response.userID,navigate,''));
            }else{
              setpopup(true);
            }
          });

          // setpopup(true);          
        }

   }
  //  close Facebook authetication handler


  // This function handler use in faceebok authentication if the email not take facebook we show popup and take email throught input
   const emailhandler=(e)=>{
      setemail(e.target.value);
   }   
   const continuebtnhandler=()=>{
    setcontinuebtn(true);
      if(email!==''){
      setpopup(false);
      dispatch(FacebookThunk(accessToken,userID,navigate,email));
      }
   }
  //  close the facebook authentication

// Login handler in this we use thunk we pass the data thunk and thunk data send to backend
   const submithandler=(e)=>{
    e.preventDefault();
    if(formik.values.email && formik.values.password){
      dispatch(LoginThunk({email:formik.values.email,password:formik.values.password},navigate));      
    }
   }
  //  close the login handler
  return ( <>
    <section className="bg-slate-700 lg:w-screen     lg:h-screen   absolute top-0 left-0 sm:w-auto ">
      {/* popup take email */}
    {popup &&
    <div className="modal bg-blue-500 text-white p-5 ml-[700px] rounded-xl w-[20rem] z-50  absolute">
      <Slide top>  
        <div className="modal-box">
          <label> Email Enter</label>
          <br/>
          <input type='email' className='h-7 text-black' onChange={emailhandler}/>
          <div className="mt-5">
              <button className="bg-white text-black rounded-lg p-1" onClick={continuebtnhandler}>Continue</button>
              <button className="bg-white text-black ml-1 rounded-lg p-1" onClick={()=>{setpopup(false);}}>Cancel</button>
          </div>
        </div>
      </Slide>
    </div>}
    {/* close email */}
    <div className=" flex flex-row  bg-white rounded-lg relative top-20  z-10  h-auto w-auto sm:w-[50rem]   md:w-auto lg:w-[60rem] lg:ml-[400px]  ">
        <div className="bg-white rounded-t-lg rounded-b-lg w-[30rem]">
          <form className="" onSubmit={submithandler}>
            <legend className="mt-[70px] ml-[200px] text-pink-600 text-3xl font-bold">
             Login
            </legend>
            <div className="ml-[135px] mt-[70px] block">
            {/* facebook library or button */}
                <FacebookLogin
                 appId="7669411649797222"
                  autoLoad={false}
                  fields="name,email,picture"
                  size='small'
                  textButton='facebook'
                  cssClass="face-button"
                  // icon={facebook}
                  // onClick={componentClicked}
                  callback={responseFacebook} />
                    <div id='loginbutton' className="google-btn" ></div>
            </div>
            <br />
            <br />
            <p className="float-left block ml-40 mt-10">
              or use another account
            </p>
            <input
              type="text"
              className="bg-slate-200 opacity-50 ml-[110px] w-[260px] h-10 outline-cyan-500"
              placeholder="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
              value={formik.values.email}
            />

            {formik.errors.email && formik.touched.email ? <div className="text-red-400 ml-[110px]">{formik.errors.email}</div> :''}
            
            <input
              type={showpassword}
              className="bg-slate-200 opacity-50 ml-[110px] mt-5 w-[260px] h-10 outline-cyan-500"
              placeholder="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              value={formik.values.password}
            />
            <br/>
            <input type='checkbox' className="ml-[110px] mt-[5px]"  id="show" onClick={showpasswordhandler} name="shown" value="shown"/>
            <label className="ml-[10px]" htmlFor="show">Show Password</label>
            <br/>
            {formik.errors.password && formik.touched.password ? <div className="text-red-400  ml-[110px]">{formik.errors.password}</div> :''}
            {!flag ? <div className="text-red-400  ml-[110px]">{data}</div> :''}
            <Link              
            to='/forgot-password'
            >
              <span
              className="ml-[150px] mt-4 text-blue-400 hover:text-pink-700 focus:underline focus:underline-offset-8 "
              >

              Forgot you password?
              </span>

            </Link>
            <button type="submit" className="ml-[180px] mt-4 bg-pink-600 hover:bg-pink-900 rounded-full text-white block px-[45px] py-1 focus:bg-white focus:border-[1px] focus:border-pink-500 focus:text-black ">
              Login
            </button>
            <Link to='/signup'>
            <button className="ml-[180px] mt-4 bg-pink-600 hover:bg-pink-900 rounded-full text-white block px-10 py-1 focus:bg-white focus:border-[1px] focus:border-pink-500 focus:text-black ">
             Signup
            </button>
            </Link> 
          </form>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-r-lg  md:w-[30rem] sm:w-[400px]   hidden lg:block medium:block">
          <div className="mt-[220px]">
            <Fade right>
              <h1 className="text-white text-[30px] text-bold ml-16">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Welcome Back")
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString("Thank you visit website")
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
};

export default Login;
