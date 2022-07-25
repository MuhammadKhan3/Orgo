import React from "react";
import "../popups/popup.css";
import Button from "../button/Button";
import MuiDropDown from "../muiComponents/MuiDropDown";
import {useSelector,useDispatch} from 'react-redux';
import { job_action } from "../redux/slice/jobSlice";
const category = [
    "Full Stack Development",
    "React Native Developer"
];

function CategoryPop({ handleClose }) {
  const categorys=useSelector(state=>state.jobSlice.category);
  console.log(categorys);


  return (
    <div className="main-box">
      <div style={{ width: "750px" }} className="popup-box">
        <div>
          <h3 className="pop-video-heading">Add Category</h3>
          <hr />
        </div>
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "150px",
          }}
        >
          <MuiDropDown text="Add Category" languages={category} setdata={job_action.setcategory}  ability={false} />
        </div>
        <div className="button-container">
          <Button className="cancel" content="Cancel" handle={handleClose} />
          <Button className="save" content="Save" />
        </div>
      </div>
    </div>
  );
}

export default CategoryPop;
