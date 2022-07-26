import React from "react";
import "../pages/jobList.css";
import Button from '../components/button/Button'

function JobList() {
  return (
    <div className="main-job-list-container">
      <div className="job-list-sub-container">
        <div className="job-list-header">
          <h1 style={{ fontSize: "1.2em", fontWeight: "500",color:"#656565" }}>Create Job</h1>
        </div>
        <ul style={{marginLeft:"30px"}}>
          <li style={{color:"#656565", fontWeight:"400"}}>Recent Job</li>
        </ul>
        <hr />
        <div className="job-list-body">
          <h2 style={{ fontSize: "1em", fontWeight: "500",color:"#656565" }}>Full stack Development</h2>
          <p style={{marginTop:"5px"}}>11 minutes ago</p>
          <p style={{marginTop:"5px"}}>Budget Price 30$ - 80$</p>
          <p style={{marginTop:"5px"}}>ahskdak</p>
        </div>

        <div className="job-list-proposal">
          <p>Proposals : 15 to 20</p>
          <div className="job-list-button">
            <Button content="Edit"/>
            <Button content="Submit"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobList;
