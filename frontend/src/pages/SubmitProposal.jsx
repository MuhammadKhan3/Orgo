import React from "react";
import "../pages/submitProposal.css";
import { TextareaAutosize } from "@mui/material";
import Button from '../components/button/Button'
import { useState,useEffect } from "react";
import DragDropFile from "../components/dragFileUploader/DragDropFile";
import { format} from 'date-fns'
import {Link, useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import Job from "../components/redux/thunk/job";
import { job_action } from "../components/redux/slice/jobSlice";
import {Cookies} from 'react-cookie'
import MsgPopup from "../components/popups/msgpopup";
const skills = ["React", "Node", "MongoDB"];

const cookies=new Cookies();

function SubmitProposal() {
    let navigate = useNavigate();
    const [popupflag,setflag]=useState({flag:true,msg:''});
    const {jobId}=useParams();
    const category=useSelector(state=>state.jobSlice.category);
    const heading=useSelector(state=>state.jobSlice.heading);
    const description=useSelector(state=>state.jobSlice.description);
    const skill=useSelector(state=>state.jobSlice.skill);
    const coverletter=useSelector(state=>state.jobSlice.coverletter);
    const rate=useSelector(state=>state.jobSlice.rate);
    const proposalfile=useSelector(state=>state.jobSlice.proposalfile);




// date
    const createdat=useSelector(state=>state.jobSlice.createdat);
    const year=new Date(createdat).getFullYear();
    const month=new Date(createdat).getMonth();
    const day=new Date(createdat).getDay();
    console.log(year,month,day)
    const date=new Date(`${year},${month},${day}`);
// close date
    const dispatch=useDispatch();
    
    useEffect(()=>{
      dispatch(Job(jobId));
    },[])


    const ratehandler=(e)=>{
      dispatch(job_action.setrate(e.target.value));
    }
    const coverhandler=(e)=>{
      dispatch(job_action.setcoverletter(e.target.value));
    }

    const submithandler=()=>{
      const token=cookies.get('token');
      const companyId=cookies.get('companyId');
      const userId=cookies.get('userId');

      if(rate && coverletter && proposalfile && companyId){
        const formdata=new FormData();
        formdata.append('rate',rate);
        formdata.append('coverletter',coverletter);
        formdata.append('file',proposalfile);
        formdata.append('companyId',companyId);
        formdata.append('userId',userId);

        axios({
          method:"post",
          url:`http://localhost:8000/create-proposal/${jobId}`,
          data:formdata,
          headers:{
            token:'Bearer '+token
          }
        }).then((response)=>{
          if(response.data.flag){
            navigate(-1);
          }else{
            setflag({flag:response.data.flag,msg:response.data.msg})
            console.log(response)
          }
      })
     } 
    }
    
  return (
  <>
  {!popupflag.flag &&
   <MsgPopup msg={popupflag.msg} title={'Bidding'} setflag={setflag}/>
  }
    <div className="main-submit-proposal">
      <div className="sub-submit-proposal-1" style={{ marginTop: "20px" }}>
        <h1 style={{ fontSize: "1.3em", fontWeight: "700" }}>Job details</h1>
      </div>
      <hr />
      <div className="sub-submit-proposal-1">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>
          {category}({heading})
        </h1>
        <div
          style={{
            display: "flex",
            alignItem: "center",
            marginTop: "15px",
          }}
        >
          <p
            style={{
              width: "auto",
              color: "white",
              backgroundColor: "#396179",
              padding: "5px",
              borderRadius: "15px",
              fontSize: "0.9em",
            }}
          >
          {category}
          </p>
          <p style={{ margin: "4px 0 0 30px", fontSize: "0.9em" }}>
            Posted {createdat && format(date, 'MMMM dd,yyyy')}
          </p>
        </div>
        {/* <div style={{ marginTop: "15px" }}>
          <p style={{ fontSize: "0.9em" }}>Developer must have experience</p>
          <ol style={{ fontSize: "0.9em" }}>
            <li>React Js</li>
            <li>Node Js</li>
            <li>Next Js</li>
          </ol>
        </div> */}
          {/* <p style={{ fontSize: "0.9em" }}>
            Service developed reactjs + nextjs + nodejs.
          </p> */}
          {/* <p style={{ fontSize: "0.9em" }}>
            Developer must have experience about 3 skill set.
          </p> */}
          <div style={{ marginTop: "15px" }}>
            {description}
          </div>
        {/* <br />
        <p>Thanks.</p>
        <br /> */}

           <button className="view-job-post-btn" onClick={()=>{navigate(-1)}}>View job Posting</button>
      </div>
      <hr />
      <div className="sub-submit-proposal-1">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>
          Skills and Expertise
        </h1>
        <ul className="skills-list">
          {skill
            ? skill.map((list, key) => {
                console.log(list.length);
                return (
                  <li
                    style={{
                      width: `${list.name.length + 1}0px`,
                      padding: "6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "20px",
                      fontSize: "0.9em",
                      fontWeight: "lighter",
                      backgroundColor: "#396179",
                      color: "white",
                      marginLeft: "10px",
                    }}
                  >
                    {list.name}
                  </li>
                );
              })
            : null}
        </ul>
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>Terms</h1>
      </div>
      <hr />

      <div className="sub-submit-proposal-2">
        <div>
          <p style={{ fontWeight: "500" }}>Hourly rate</p>
          <p style={{ fontSize: "0.9em" }}>
            Total amount the client will see on your proposal
          </p>
        </div>
        <div>
          <div
            style={{
              width: "200px",
              border: "1px solid gray",
              display: "flex",
              justifyContent: "space-between",
              padding: "5px",
              borderRadius:"3px",
              margin:"15px 0 0 150px",
              fontSize:"0.9em"
            }}
          >
            <p>$</p>
            <input className="rate-input" type="number" onChange={ratehandler} value={rate} />
          </div>
        </div>
      </div>
      <hr />
      <div className="sub-submit-proposal-1">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>Cover letter</h1>
        <TextareaAutosize
          aria-label="Enter Description"
          onChange={coverhandler}
          value={coverletter}
          placeholder="Already have a job description ? paste ir here!"
          style={{
            width: 990,
            border: "1px solid #999",
            borderRadius: "3px",
            padding: "10px",
            fontSize: "0.9em",
            marginTop: "5px",
          }}
          minRows={3}
        />
        <DragDropFile/>
      </div>
      <div className="sub-submit-proposal-1">
        <Button content="Submit" handle={submithandler}/>
        <Button content="Cancel" />
      </div>
    </div>
    </>);
}

export default SubmitProposal;
