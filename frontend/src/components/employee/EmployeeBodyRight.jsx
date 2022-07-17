import React from "react";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";

function EmployeeBodyRight() {
  return (
    <div className="body-section-right">
      <div className="bsr1">
        <h2 style={{ width: "415px" }}>
          Project Management | Bootstrap, C#, CSS 3, CSS, Database, Firebase{" "}
          <CreateTwoToneIcon style={{ marginLeft: "20px" }} />
        </h2>
        <h3>
          $10.00/hr <CreateTwoToneIcon style={{ marginLeft: "20px" }} />
        </h3>
      </div>

      <div className="bsr2">
        <p>Objective</p>
        <p style={{ marginBottom: "30px" }}>
          Brilliant and creative IT professional with Bachelor’s Degree in
          Information Technology and passionate about creating customized
          solutions seeks the position of Front-end Developer in an exciting and
          growing company. Coming with 3years experience and certifications in
          and with TML, JavaScript,PHP, C# basic of ASP.NETmvc providing quality
          support to company’s IT team.
        </p>
        <hr />
      </div>

      <div className="bsr3">
        <h3 style={{ fontWeight: "initial" }}>Work History</h3>
        <p>
          No work yet. Once you start getting hired on Upwork, your work with
          clients will show up here.
        </p>
        <p className="bsr-search">Start your search</p>
        <hr />
      </div>

      <div className="bsr4">
        <h3 style={{ fontWeight: "initial" }}>Portfolio</h3>
        <AddCircleOutlineIcon style={{ marginLeft: "20px" }} />
      </div>

      <br />
      <div className="bsr5main">
        <div className="bsr5">
          <AddBoxIcon className="portfolioIcon" />
          <p>
            Talent who add portfolios to their profile are more likely to win
            work. (+20%)
          </p>
          <p className="bsr-search">Add Search</p>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default EmployeeBodyRight;
