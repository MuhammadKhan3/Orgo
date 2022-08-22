import React, { useState } from "react";
import "../createJob/create.css";
import { TextareaAutosize } from "@mui/material";
import Button from "../button/Button";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import FileUploader from "../FileUploader";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import CategoryPop from "../popups/CategoryPop";
import SkillListPop from "../popups/SkillListPop";
import BudgetPop from "../popups/BudgetPop";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie'
import { useDispatch,useSelector } from "react-redux";
import { job_action } from "../redux/slice/jobSlice";
import axios from "axios";


const cookies=new Cookies();
const skillList = ["MongoDb", "Node", "React", "Api", "GraphQL"];
function CreateJobCompo() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const heading=useSelector(state=>state.jobSlice.heading);
  const description=useSelector(state=>state.jobSlice.description);
  const files=useSelector(state=>state.jobSlice.file);
  const category=useSelector(state=>state.jobSlice.category);
  const skill=useSelector(state=>state.jobSlice.skill);
  const min=useSelector(state=>state.jobSlice.min);
  const max=useSelector(state=>state.jobSlice.max);



  
  const [categoryPop, setCategoryPop] = useState(false);
  const [skillPop, setSkillPop] = useState(false);
  const [budgetPop, setBudgetPop] = useState(false);
   


  const handleheading=(e)=>{
    dispatch(job_action.setheading(e.target.value))
  }

  const handleDescription = (e) => {
    dispatch(job_action.setdescription(e.target.value))

  };

  const handleCategoryPop = () => {
    setCategoryPop(!categoryPop);
  };

  const handleSkillPop = () => {
    setSkillPop(!skillPop);
  };

  const handleBudgetPop = () => {
    setBudgetPop(!budgetPop);
  };

  const savehandler=()=>{
    const employeeId=cookies.get('employeeId');
    const token=cookies.get('token');

    console.log(heading,description,files,skill,category,{budget:{min,max}});
    const formdata=new FormData();
    formdata.append('heading',heading);
    formdata.append('description',description);
    files.forEach((file)=>{
      formdata.append('files',file);
    })

    
    skill.forEach((value,i)=>{
      formdata.append(`skill[${i}][id]`,value.id);
      formdata.append(`skill[${i}][name]`,value.name);
    })

    formdata.append('category',category);
    formdata.append('budget[min]',min);
    formdata.append('budget[max]',max);



    axios({
      method: 'POST',
      url: `http://localhost:8000/create-job/${employeeId}`,
      data: formdata,
      headers:{
        'Content-Type': 'multipart/form-data',
        token:"Bearer "+token
      }
    }).then((response)=>{
      if(response.data.msg){
        console.log(response);
      }else {
        navigate('/job-list')     
        cookies.set('active_state','job-list');
        window.location.reload(false);
      }
    })
  }
  return (
    <div className="create-main-head">
      <br />
      <h1 style={{ fontSize: "1.5em", margin: "30px", fontWeight: "bold" }}>
        Create Job
      </h1>
      <hr />
      <div className="head-container1">
        <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Headline</h3>
        <input
          className="head-input"
          type="text"
          onChange={handleheading}
          placeholder="Your profession"
        />
      </div>
      <hr />
      <div className="describe-job">
        <h3 style={{ fontSize: "1em", fontWeight: "500" }}>
          Describe your job
        </h3>
        <p style={{ marginTop: "5px" }}>
          This is how talent figure out what you need and why you are to work
          with!
        </p>
        <TextareaAutosize
          aria-label="Enter Description"
          onChange={handleDescription}
          value={description}
          placeholder="Already have a job description ? paste ir here!"
          style={{
            width: 595,
            border: "1px solid #999",
            borderRadius: "3px",
            padding: "10px",
            fontSize: "0.9em",
            marginTop: "5px",
          }}
          minRows={8}
        />
        {description.length === 0 && (
          <p style={{ color: "red", marginTop: "5px" }}>
            {" "}
            <FmdBadIcon /> Please add description
          </p>
        )}
      </div>
      <div className="attach-file">
        <FileUploader />
        <p>Max file size : 100MB</p>
        {files.map((file)=>{
          return <li>{file.name}</li>
        })}
      </div>
      <br />
      <hr />
      <div className="category">
        <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Category</h3>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}
        >
          <p>{category}</p>
          <CreateTwoToneIcon
            onClick={handleCategoryPop}
            style={{ marginLeft: "20px", cursor: "pointer" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Skills</h3>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <ul
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "400px",
                marginTop: "-20px",
                flexWrap: "wrap",
              }}
            >
              {skill
                ? skill.map((list, key) => {
                    console.log(list.name.length);
                    return (
                      <li
                        key={list.id}
                        style={{
                          width: `${list.name.length + 1}0px`,
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
                        {list.name}
                      </li>
                    );
                  })
                : null}
            </ul>
            <CreateTwoToneIcon
              onClick={handleSkillPop}
              style={{
                marginLeft: "30px",
                marginTop: "12px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Budget</h3>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}
          >
            <p>${min} - ${max}/hr</p>
            <CreateTwoToneIcon
              onClick={handleBudgetPop}
              style={{ marginLeft: "20px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button content="Cancle Job" />
          <Button content="Create Job" handle={savehandler} />
        </div>
      </div>

      {categoryPop ? <CategoryPop handleClose={handleCategoryPop} /> : null}
      {skillPop ? <SkillListPop handleClose={handleSkillPop} /> : null}
      {budgetPop ? <BudgetPop handleClose={handleBudgetPop} /> : null}
    </div>
  );
}

export default CreateJobCompo;
