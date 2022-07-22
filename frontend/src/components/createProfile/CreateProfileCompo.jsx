import React, { useState } from "react";
import "../createProfile/create.css";
import { TextareaAutosize } from "@mui/material";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import FileUploader from "../FileUploader";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";

function CreateProfileCompo() {
  const [description, setDescription] = useState("");
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const skillList = ["MongoDb", "Node", "React", "Api", "GraphQL"];

  return (
    <div className="create-main-head">
      <br />
      <hr />
      <div className="head-container1">
        <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Headline</h3>
        <input
          className="head-input"
          type="text"
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
      </div>
      <br />
      <hr />
      <div className="category">
        <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Category</h3>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}
        >
          <p>Full stack development</p>
          <CreateTwoToneIcon style={{ marginLeft: "20px" }} />
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
              style={{ marginLeft: "30px", marginTop: "12px" }}
            />
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3 style={{ fontSize: "1em", fontWeight: "500" }}>Budget</h3>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "5px" }}
          >
            <p>$12.00 - $25.00/hr</p>
            <CreateTwoToneIcon style={{ marginLeft: "20px" }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfileCompo;
