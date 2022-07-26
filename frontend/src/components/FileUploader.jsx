import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {job_action} from './redux/slice/jobSlice'
function FileUploader(props) {
  const file=useSelector(state=>state.jobSlice.file);
  const dispatch=useDispatch();
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  
  const handleChange = async(event) => {
     
      for (let file of event.target.files) {
        dispatch(job_action.setfile(file))
      }

  };
  
  return (
    <>

      <button onClick={handleClick} style={{border:"1px solid green", padding:"6px", borderRadius:"20px", fontSize:"0.9em",color: "#656565"}} >
        <AttachFileIcon /> Attach file
      </button>
      <input
        type="file"
        multiple
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
}

export default FileUploader;
