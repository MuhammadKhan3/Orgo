import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";

function FileUploader(props) {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  
  return (
    <>
      <button onClick={handleClick} style={{border:"1px solid green", padding:"6px", borderRadius:"20px", fontSize:"0.9em",color: "#656565"}} >
        <AttachFileIcon /> Attach file
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default FileUploader;
