import React from "react";
import "../pages/submitProposal.css";
import { TextareaAutosize } from "@mui/material";
import Button from '../components/button/Button'
import { useState } from "react";
import DragDropFile from "../components/dragFileUploader/DragDropFile";

const skills = ["React", "Node", "MongoDB"];

function SubmitProposal() {

    const [description,setDescription]=useState();
    
    const handleDescription=()=>{
        /* .... */
    }
  return (
    <div className="main-submit-proposal">
      <div className="sub-submit-proposal-1" style={{ marginTop: "20px" }}>
        <h1 style={{ fontSize: "1.3em", fontWeight: "700" }}>Job details</h1>
      </div>
      <hr />
      <div className="sub-submit-proposal-1">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>
          Full Stack Developer(reactJs + nextJs)
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
            Full stack development
          </p>
          <p style={{ margin: "4px 0 0 30px", fontSize: "0.9em" }}>
            Posted July 13,2022
          </p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p style={{ fontSize: "0.9em" }}>Developer must have experience</p>
          <ol style={{ fontSize: "0.9em" }}>
            <li>React Js</li>
            <li>Node Js</li>
            <li>Next Js</li>
          </ol>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p style={{ fontSize: "0.9em" }}>
            Service developed reactjs + nextjs + nodejs.
          </p>
          <p style={{ fontSize: "0.9em" }}>
            Developer must have experience about 3 skill set.
          </p>
        </div>
        <br />
        <p>Thanks.</p>
        <br />
        <button className="view-job-post-btn">View job Posting</button>
      </div>
      <hr />
      <div className="sub-submit-proposal-1">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>
          Skills and Expertise
        </h1>
        <ul className="skills-list">
          {skills
            ? skills.map((list, key) => {
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
                      fontSize: "0.9em",
                      fontWeight: "lighter",
                      backgroundColor: "#396179",
                      color: "white",
                      marginLeft: "10px",
                    }}
                  >
                    {list}
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
            <input className="rate-input" type="text" value="60" />
          </div>
        </div>
      </div>
      <hr />
      <div className="sub-submit-proposal-1">
        <h1 style={{ fontSize: "1.1em", fontWeight: "500" }}>Cover letter</h1>
        <TextareaAutosize
          aria-label="Enter Description"
          onChange={handleDescription}
          value={description}
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
        <Button content="Submit" />
        <Button content="Cancel" />
      </div>
    </div>
  );
}

export default SubmitProposal;
