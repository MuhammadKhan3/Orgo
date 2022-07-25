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
const skillList = ["MongoDb", "Node", "React", "Api", "GraphQL"];
function EditJobCompo() {
  const dispatch=useDispatch();
    const heading=useSelector(state=>state.jobSlice.heading);
    const description=useSelector(state=>state.jobSlice.description);
    const file=useSelector(state=>state.jobSlice.file);
    const category=useSelector(state=>state.jobSlice.category);
    const skill=useSelector(state=>state.jobSlice.skill);
    const min=useSelector(state=>state.jobSlice.min);
    const max=useSelector(state=>state.jobSlice.max);



    console.log(heading)

  const [categoryPop, setCategoryPop] = useState(false);
  const [skillPop, setSkillPop] = useState(false);
  const [budgetPop, setBudgetPop] = useState(false);

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
        {file.map((value)=>{
          return  <li>{value.originalname}</li>;
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
              {skillList
                ? skillList.map((list, key) => {
                    console.log(list.length);
                    return (
                      <li
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
          <Button content="Edit Job" />
        </div>
      </div>
      {categoryPop ? <CategoryPop handleClose={handleCategoryPop} /> : null}
      {skillPop ? <SkillListPop handleClose={handleSkillPop} /> : null}
      {budgetPop ? <BudgetPop handleClose={handleBudgetPop} /> : null}
    </div>
  );
}

export default EditJobCompo;
