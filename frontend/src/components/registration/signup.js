import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Typewriter from "typewriter-effect";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import Googlethunk from "../redux/thunk/googlethunk";
import FacebookThunk from "../redux/thunk/facebookthunk";
import Slide  from "react-reveal/Slide";
import { useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { useFormik } from 'formik';
import axios from "axios";
import * as Yup from 'yup';
import signupThunk from "../redux/thunk/signupthunk";
import { user_action } from "../redux/slice/userSlice";
import VerifiedThunk from "../redux/thunk/verifiedthunk";

const Signup = () => {
  const email=useSelector(state=>state.userSlice.email);
  const errors=useSelector(state=>state.userSlice.errors);
  const [usergroup,setuserGroup]=React.useState('')
  const msg=useSelector(state=>state.userSlice.msg)
  const dispatch=useDispatch();
  const [popup,setpopup]=useState(false);
  const [continuebtn,setcontinuebtn]=useState(false);
  const [userID,setuserID]=useState('');
  const [accessToken,setaccessToken]=useState('');
  const [showpassword,setshowpassword]=useState('password');
  const changestatus=useSelector(state=>state.userSlice.changestatus);
  const [openModal,setModal]=useState(false);
  const [authtype,setauth]=useState('');

  //Yup library for use formik to validation
  const validationSchema=Yup.object().shape({
    email:Yup.string().email('Invalid Email').required('Required email'),
    firstname:Yup.string().min(3,'Too Short').max(100,'Too Long').required('Required First name'),
    lastname:Yup.string().min(3,'Too Short').max(100,'Too Long').required('Required Last name'),
    password:Yup.string().min(8,'Too Short').max(20,'Too Long').required('Required password'),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],"Password does not match")
    .min(8,'Too Short').max(20,'Too Long').required('Required password'),
    verification:Yup.string().min(5,"value length less than and equal 6").max(6,"value greater than 5 and equal 6")
  });
  //Formik hook start
  const formik=useFormik({
    initialValues:{
      firstname:'',
      lastname:'',
      email:'',
      password:'',
      confirmPassword:'',
      verification:'',
    },
    validationSchema:validationSchema
  })
  //Formik hook close
  
  const showpasswordhandler=()=>{
    if(showpassword==='password'){
      setshowpassword('text')
    }else{
      setshowpassword('password')
    }
  }


  const navigate=useNavigate();
  const clickhandler=(response)=>{
    setuserID(response.clientId);
    setaccessToken(response.credential);
    setModal(true);
    setauth('google')
    console.log('hie')
  }

  useEffect(()=>{
    /* global google*/
   const google=window.google
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

   const responseFacebook = (response) => {
    setuserID(response.userID);
    setaccessToken(response.accessToken);
    if(response.email){
      setauth('facebook')
      setModal(true);
    }else{
      const obj={
        clientId:response.userID,
      }
      axios.post('http://localhost:8000/facebookcheck',obj)
      .then(responses=>{
        console.log(responses)
        const flag=responses.data.flag;
        if(flag===true){
          dispatch(FacebookThunk(response.accessToken,response.userID,'',navigate));
        }else{
          setModal(true);
          setpopup(true);
        }
      });
      // setpopup(true);          
    }
   }

   const continuebtnhandler=()=>{
    console.log('continuehandler')
    console.log(formik.values.email)
    if(accessToken && formik.values.email==='' && authtype==='facebook'){
      dispatch(FacebookThunk(accessToken,userID,usergroup,'',navigate));
      setModal(false);
    }else if(formik.values.email.length>0){
      setcontinuebtn(true);
      setpopup(false);
      setModal(false)
      dispatch(FacebookThunk(accessToken,userID,usergroup,formik.values.email,navigate));
    }else  if(authtype==='google'){
      setpopup(false);
      setModal(false)
      dispatch(Googlethunk(accessToken,userID,usergroup,navigate));
    }
   }

  const submithandler=(e)=>{
    e.preventDefault();
    if(formik.values.firstname && formik.values.lastname && formik.values.password && formik.values.confirmPassword && formik.values.email){
      dispatch(user_action.setemail(formik.values.email));
      dispatch(signupThunk({firstname:formik.values.firstname,type:usergroup,lastname:formik.values.lastname,email:formik.values.email,password:formik.values.password,confirmPassword:formik.values.confirmPassword},navigate));
    }
  }
  
  const verificationhandler=(e)=>{
    e.preventDefault();
    if(formik.values.verification){
        dispatch(VerifiedThunk({email:email,code:formik.values.verification},navigate))
    }
  }

//we use the change status variable to render the different component first we show signup page after we verification page
if(changestatus==='one'){
  return (
    <>
    {/* Modal */}
    <div className={`modal  z-20 ${openModal ===true ? 'modal-open':''}`}>
      <div className="modal-box h-[400px]">
          <div className="ml-[20px] block mt-5 ">
              {/* Email */}
            {popup &&<>
              <label> Email Enter</label>
              <br/>
              <input type="email" placeholder="Type here" className="input input-bordered input-secondary w-full max-w-xs" onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' />
              </> }  
             {/* Close Email */}
              {/* User type */}
                  <label style={{float:'left'}}>Select the user type</label>
                  <br/>
                  <br/>
                  <input type='radio' name='employee' id='employee' hidden/>
                  <div style={{border:usergroup==='employee' ?'1px solid black':'1px solid lightgray',height:'80px',width:'80px',padding:'5px',paddingTop:'30px',color: 'black',float:'left',boxShadow:usergroup==='employee' ? ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19':''}} onClick={()=>{setuserGroup('employee')}}>
                  <label htmlFor='employee'>
                      employee
                  </label>
                  </div>
                  <input type='radio' name='freelancer' id='freelancer' value='' hidden/>
                  <div style={{border:usergroup==='freelancer' ?'1px solid black':'1px solid lightgray',width:'180px',padding:'5px',paddingTop:'30px',color:'black',float:'left',height:'80px',marginLeft:'5px',  boxShadow:usergroup==='freelancer' ? ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19':''}} onClick={()=>{setuserGroup('freelancer')}}>
                  <label htmlFor='employee'>
                      organization/Freelancer
                  </label>
                  </div>
                  </div>
                  <br/>
              {/*Close User type  */}
              {/* Button */}
                  <br/>
                  <br/>
                  <br/>
              <div className="mt-2 block ml-[20px] space-x-3">
                  <button className="btn btn-outline btn-secondary"  onClick={continuebtnhandler} >Continue</button>
                  <button className="btn btn-outline btn-accent"     onClick={()=>{setpopup(false)}}>Cancel</button>

              </div>
              {/* close Button */}
      </div>
    </div>
    {/* close modal */}
        {/* /Signup section  */}
      <section className="bg-slate-700 lg:w-screen     lg:h-screen   absolute top-0 left-0 sm:w-auto">
        <div className=" flex flex-row  bg-white rounded-lg relative top-10  z-10  h-auto  w-auto sm:w-[50rem]   md:w-auto lg:w-[80rem] ml-[200px]">        
          <div className="bg-white rounded-t-lg rounded-b-lg w-[80rem] pb-5">
            <form className="" onSubmit={submithandler}>
              <legend className="mt-[70px] ml-[335px] text-pink-6w00 text-3xl font-bold">
                Signup
              </legend>
              <div className="ml-[335px] mt-[70px]">
                  <FacebookLogin
                   appId="562863815542621"
                    autoLoad={false}
                    fields="name,email,picture"
                    size='small'
                    textButton='facebook'
                    cssClass="face-button"
                    // icon={facebook}
                    // onClick={componentClicked}
                    callback={responseFacebook}  />
                      <div id='loginbutton' className="google-btn" ></div>
              </div>
  
              <br/>
              <br/>
              <p className="float-left block ml-[340px] mt-5 ">
                or use another account
              </p>
              <br/>
              <div className=" w-[200px] h-[40px] block" style={{marginLeft:'340px'}}>
                  {errors.length>0 && errors.map((value,i)=>{
                    return(<p key={i} className="text-red-500    w-[200px]">{value.msg}</p>);
                  })}
              </div>
              <br/>
              <input
                type="text"
                className="bg-slate-200 opacity-50  w-[260px] h-10 outline-cyan-500 inline-block ml-36 float-left"
                placeholder="firstname"
                name="firstname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
              />
              {formik.errors.firstname  && formik.touched.firstname ?<><div className="text-red-400 inline-block relative top-10 ml-[-260px] float-left">{formik.errors.firstname}</div></>:''}
              <input
                type="text"
                className="bg-slate-200 opacity-50  w-[260px] h-10 ml-10 outline-cyan-500 inline-block float-left"
                placeholder="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                name="lastname"
              />
              {formik.errors.lastname && formik.touched.lastname ? <div className="text-red-400  inline-block float-left relative  ml-[440px] ">{formik.errors.lastname}</div>:''}
              <input
                type="text"
                className="bg-slate-200 opacity-50 inline-block ml-[144px] mt-10 w-[260px] h-10 outline-cyan-500 float-left"
                placeholder="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? <div className="text-red-400 mt-[78px]   inline-block float-left ml-[-260px]">{formik.errors.email}</div>:''}
              <input
                type={showpassword}
                className="bg-slate-200 opacity-50 ml-[40px] mt-10 w-[260px] h-10 outline-cyan-500"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
              />
              {formik.errors.password && formik.touched.password ? <div className="text-red-400  ml-[444px]">{formik.errors.password}</div>:''}
              <input
                type={showpassword}
                className="bg-slate-200 opacity-50 ml-[140px] mt-5 w-[260px] h-10 outline-cyan-500 inline-block"
                placeholder="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="text-red-400 ml-[140px] mt-[5px]">{formik.errors.confirmPassword}</div>:''}
                      {/* user group switch */}
          <div className="ml-[140px] block mt-5 ">
            <label style={{float:'left'}}>Select the user type</label>
            <br/>
            <input type='radio' name='employee' id='employee' hidden/>
            <div style={{border:usergroup==='employee' ?'1px solid black':'1px solid lightgray',height:'80px',width:'80px',padding:'5px',paddingTop:'30px',color: 'black',float:'left',boxShadow:usergroup==='employee' ? ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19':''}} onClick={()=>{setuserGroup('employee')}}>
            <label htmlFor='employee'>
                employee
            </label>
            </div>
            <input type='radio' name='freelancer' id='freelancer' value='' hidden/>
            <div style={{border:usergroup==='freelancer' ?'1px solid black':'1px solid lightgray',width:'180px',padding:'5px',paddingTop:'30px',color:'black',float:'left',height:'80px',marginLeft:'5px',  boxShadow:usergroup==='freelancer' ? ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19':''}} onClick={()=>{setuserGroup('freelancer')}}>
            <label htmlFor='employee'>
                organization/Freelancer
            </label>
            </div>
         </div>
         <br/>

        {/* close the user switch group */}
              <br/>
              <br/>
              <br/>

              <input type='checkbox' className="ml-[140px] mt-[5px]" id='show'  onClick={showpasswordhandler} name="shown" value="shown"/>
              <label className="ml-[10px]" htmlFor="show">Show Password</label>
              <br/>
              <Link              
              to='/forgot-password'
              >
                <span
                className="ml-[320px] mt-4 text-blue-400 hover:text-pink-700 focus:underline focus:underline-offset-8 "
                >
                  Forgot you password?
                </span>
              </Link>
              <br/>
              <button type="submit" className="ml-[280px] mt-4 bg-pink-600 hover:bg-pink-900 rounded-full text-white block px-10 py-1 focus:bg-white focus:border-[1px] focus:border-pink-500 focus:text-black float-left ">
                Signup
              </button>
              <Link to="/login">
                <button className="ml-[10px] mt-4 bg-pink-600 hover:bg-pink-900 rounded-full text-white block px-[45px] py-1  focus:bg-white focus:border-[1px] focus:border-pink-500 focus:text-black float-left ">
                  Login
                </button>
              </Link>
            </form>
          </div>
          {/* close the signup section */}
          {/* animation Content  */}
          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 rounded-r-lg  md:w-[30rem] sm:w-[400px]   hidden lg:block medium:block p-5">
            <div className="mt-[220px]">
              <Fade right>
                <h1 className="text-white text-[30px] text-bold ml-36">
                  <Typewriter
                    className
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
                <p className="text-white text-justify w-96 ml-16 medium:w-[260px]">
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
}else if(changestatus==='two')
return ( <>
  <section className="bg-slate-700 h-screen w-screen    absolute top-0 left-0 ">
      <div className=" flex flex-row  bg-white rounded-lg h-[40rem] w-[60rem] relative top-20 left-[400px] z-10 ">
          <div className="bg-white rounded-t-lg rounded-b-lg w-[30rem]">
          <form className="" onSubmit={verificationhandler}>
              <legend className="mt-[170px] ml-[120px] text-blue-400 text-3xl font-bold">
                Verification
              </legend>
              <br />
              <br />
              {msg.length>0 && <p style={{position:'relative',marginLeft:'130px',color:'red'}}>{msg}</p>}
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
          {/* close animation Content  */}

      </div>
  </section>
</>)
};

export default Signup;
