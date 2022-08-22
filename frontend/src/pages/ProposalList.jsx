import React,{useEffect,useState } from "react";
import "../pages/proposalList.css";
import avatar from "../pages/avatar.png";
import Button from "../components/button/Button";
import {useDispatch,useSelector} from 'react-redux';
import {Cookies} from 'react-cookie'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout'
import {Link, useParams} from 'react-router-dom'
import { job_action } from "../components/redux/slice/jobSlice";
import {useNavigate} from "react-router-dom"

const cookies=new Cookies();

const skills = [
  "MySQL",
  "MongoDb",
  "Firebase",
  "Express",
  "JavaScript",
  "React",
];
function ProposalList() {
  const {jobId}=useParams();
  const dispatch=useDispatch();
  const proposal=useSelector(state=>state.jobSlice.proposals);
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [employeeId,setemployeeId]=useState('');
  const [proposalId,setproposalId]=useState('');
  const [companyId,setcompanyId]=useState('');
  const [companyprofile,setcompanyprofile]=useState('');
  const [amount,setamount]=useState('');
  const navigate=useNavigate();
  useEffect(()=>{
    const fetchproposal=()=>{
      const token=cookies.get('token');
      axios.post(`http://localhost:8000/proposal-list/${jobId}`,{
        headers:{
          authorization:'Bearer '+token 
        }
      }).then((response)=>{
        dispatch(job_action.setproposal(response.data.proposal))
      })
    }
    fetchproposal();
  },[])

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    const formdata = new FormData();
    formdata.append("file", file);
  };


  const payment=(companyId,companyprofile,amount,proposalId)=>{
    const employeeId=cookies.get('employeeId');
    // console.log(employeeId,companyId,companyprofile,amount)
    setemployeeId(employeeId)
    setcompanyId(companyId)
    setcompanyprofile(companyprofile)
    setamount(amount)
    setproposalId(proposalId);
  }

  const handletoken=(tokens,addresses)=>{

    const token=cookies.get('token');
    axios.post('http://localhost:8000/checkout',{
      employeeId,
      jobId,
      proposalId,
      companyId,
      companyprofile,
      amount,
      tokens,
      addresses,
      headers:{
        authorization:'Bearer '+token
      }
    })
    .then((response)=>{
      console.log(response);
    })    
    window.location.reload(false);
  }
  return (
    <div className="main-proposal-list-container">
      <div className="proposal-list-sub-container">
        <div className="proposal-list-header">
          <h1
            style={{ fontSize: "1.2em", fontWeight: "500", color: "#656565" }}
          >
            Proposal
          </h1>
        </div>
        <ul style={{ marginLeft: "30px" }}>
          <li
            style={{
              color: "#656565",
              fontWeight: "400",
              borderBottom: "2px solid green",
              width: "130px",
            }}
          >
            Recent Proposals
          </li>
        </ul>
    {proposal.length>0 &&
      proposal.map((proposal,i)=>{
        return (<>
        <div key={proposal[0]._id} onMouseEnter={()=>payment(proposal[1].companyId._id,proposal[1]._id,proposal[0].rate,proposal[0]._id)}>
        <hr />
        <div className="proposal-list-user-info">
          <div className="user-info-container-1">
            <div className="profile-image">
              <input
                className="profile-change-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
              />
              {console.log(proposal)}              
              <div
                className="image-avatar"
                style={{cursor:'pointer'}}
                onClick={() => {cookies.set('companyId',proposal[0].companyId);navigate('/company/profile');}}
                // imageUploader.current.click()
              >
                <img
                  className="user-avatar-image"
                  src={proposal[1].picture ? `http://localhost:8000/${proposal[1].picture}` :avatar}
                  // ref={uploadedImage}
                />
              </div>
            </div>
            <div className="user-name-rates">
              <h2 style={{color:"green", fontSize:"1.2em", fontWeight:"500"}}>{proposal[1].companyId.companyName}      {proposal[0].hire && <span style={{backgroundColor:'#6CC417',color:'white',borderRadius:'10px',padding:'5px',fontSize:'16px' }}> hired</span>}</h2>
              <p style={{color:"#656565"}}>{proposal[1].title} </p>
              <p>{proposal[1].companyId.country}</p>
              <div className="rates">
                <p> ${proposal[0].rate}.00 <span style={{fontSize:'12px',fontWeight:'bold'}}>rate</span></p>
                <p style={{marginLeft:'70px'}}>${proposal[1].companyId.earn}  <span style={{fontSize:'12px',fontWeight:'bold',}}>earned</span></p>
              </div>
              <p style={{ marginTop: "10px",display:'inline' }}>
                {proposal[0].coverletter}
              </p>
            </div>
            <div style={{ marginLeft: "50px"}}>
              <Link to={`/message?receiveId=${proposal[0].userId._id}`}>
                <Button content="Messages" />
              </Link>
              {!proposal[0].hire &&
              <StripeCheckout
                className=''
                stripeKey='pk_test_51LMaPPSASfMwgZx33njrIb1xC9iXdn5RunLezSNxEXyXPPcaToK1X9DIOobYFdrqrTasN80x2bzYyLQo0Sv3zlF800mlMIBUKG'
                label='Hire'
                token={handletoken}
                amount={proposal[0].rate*100}
                name={proposal[1].companyId.companyName}
                billingAddress
                shippingAddress
              ><button className="custom-button">Hire</button></StripeCheckout>
              }
            </div>
          </div>
          <ul className="skill-list">
            {proposal[1].skills
              ? proposal[1].skills.split(',').map((list, key) => {
                  return (
                    <li 
                      key={key}
                      style={{
                        width: `${list.length + 1}0px`,
                        padding: "6px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "20px",
                        fontSize: "0.8em",
                        fontWeight: "lighter",
                        backgroundColor: "#396179",
                        color: "white",
                      }}
                    >
                      {list}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>        
        </div></>)
      })
     }
      </div>
    </div>
  );
}

export default ProposalList;
