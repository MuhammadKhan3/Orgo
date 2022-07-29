import React, { useState } from "react";
import { TextareaAutosize } from "@mui/material";
import Button from "../button/Button";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import FileUploader from "../FileUploader";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import CategoryPop from "../popups/CategoryPop";
import SkillListPop from "../popups/SkillListPop";
import BudgetPop from "../popups/BudgetPop";
import '../createJob/create.css'
import {useSelector,useDispatch} from 'react-redux';
import { job_action } from "../redux/slice/jobSlice";
import axios from 'axios';
import { useParams } from "react-router-dom";
import {Cookies} from 'react-cookie';
const cookies=new Cookies();

const skillList = ["MongoDb", "Node", "React", "Api", "GraphQL"];
function EditJobCompo() {
  const dispatch=useDispatch();
    const {jobId}=useParams();
    const heading=useSelector(state=>state.jobSlice.heading);
    const description=useSelector(state=>state.jobSlice.description);
    const file=useSelector(state=>state.jobSlice.file);
    //Files get the file name from db 
    const files=useSelector(state=>state.jobSlice.files);
    const deletefile=useSelector(state=>state.jobSlice.deletefile);

    const category=useSelector(state=>state.jobSlice.category);
    const skill=useSelector(state=>state.jobSlice.skill);
    const min=useSelector(state=>state.jobSlice.min);
    const max=useSelector(state=>state.jobSlice.max);


  const [categoryPop, setCategoryPop] = useState(false);
  const [skillPop, setSkillPop] = useState(false);
  const [budgetPop, setBudgetPop] = useState(false);


  const headinghandler=(e)=>{
    dispatch(job_action.setheading(e.target.value))
  }
  const handleDescription = (e) => {
    // setDescription(e.target.value);
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

  const deletefiles=(id)=>{

    dispatch(job_action.setdeletefile(files[id].filename))
    const remfile=files.filter((file,i)=>{
      return id!==i
    })
    console.log(remfile)
    dispatch(job_action.setfiles(remfile))
  }

  const localdeletefile=(id)=>{
    const remfile=file.filter((file,i)=>{
      return id!==i
    })
    dispatch(job_action.setremovefile(remfile))

  }
// Edit handler
  const edithandler=()=>{
    const token=cookies.get('token');
    const formdata=new FormData();
    formdata.append('heading',heading);
    formdata.append('description',description);
    skill.forEach((s,i)=>{
      formdata.append(`skills[${i}][id]`,s.id);
      formdata.append(`skills[${i}][name]`,s.name);
    })
    files.forEach((file,i)=>{
      formdata.append(`files[${i}][fieldname]`,file.fieldname);
      formdata.append(`files[${i}][originalname]`,file.originalname);
      formdata.append(`files[${i}][encoding]`,file.encoding);
      formdata.append(`files[${i}][mimetype]`,file.mimetype);
      formdata.append(`files[${i}][destination]`,file.destination);
      formdata.append(`files[${i}][filename]`,file.filename);
      formdata.append(`files[${i}][path]`,file.path);
      formdata.append(`files[${i}][size]`,file.size);
    })

    file.forEach((f)=>{
      formdata.append('file',f);
    })
    formdata.append('budget[min]',min);
    formdata.append('budget[max]',max);
    deletefile.forEach((deletef)=>{
      formdata.append('deletefile[]',deletef)
    })
    formdata.append('category',category);

    

    axios({
      method: 'POST',
      headers:{
        authorization:'Bearer '+token
      },
      url: `http://localhost:8000/edit-job/${jobId}`,
      data: formdata,
      headers:{
        'Content-Type': 'multipart/form-data',
        token:"Bearer "+token
      }
    })
    .then((response)=>{
      console.log(response)
    })
  }


  return (
    <div className="create-main-head">
      <br />
      <h1 style={{ fontSize: "1.5em", margin: "30px", fontWeight: "bold" }}>
        Edit your Job
      </h1>
      <hr />
      <div className="head-container1">
        <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Headline</h3>
        <input
          className="head-input"
          type="text"
          placeholder="Your profession"
          value={heading}
          onChange={headinghandler}
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
        {files.map((value,i)=>{
          return  <li key={i}>{value.originalname} <button onClick={()=>deletefiles(i)} >delete</button></li>;
        })}
        {file.map((value,i)=>{
          return  <li key={i} >{value.name} <button onClick={()=>localdeletefile(i)}>delete</button></li>;
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

                    return (
                      <li
                        key={key}
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
            <p>${min}.00 - ${max}.00/hr</p>
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
          <Button handle={edithandler} content="Edit Job" />
        </div>
      </div>
      {categoryPop ? <CategoryPop handleClose={handleCategoryPop} /> : null}
      {skillPop ? <SkillListPop handleClose={handleSkillPop} /> : null}
      {budgetPop ? <BudgetPop handleClose={handleBudgetPop} /> : null}
    </div>
  );
}

export default EditJobCompo;
