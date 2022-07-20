import React, { useState } from "react";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TitlePop from "../popups/TitlePop";
import HourlyRatePop from "../popups/HourlyRatePop";
import PortfolioPop from "../popups/PortfolioPop";

function EmployeeBodyRight() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [pop, setPop] = useState({
    titlePop: false,
    ratePop: false,
    portfolioPop: false,
  });

  const handleTitlePop = () => {
    setPop({
      titlePop: !pop.titlePop,
    });
  };

  const handleRatePop = () => {
    setPop({
      ratePop: !pop.ratePop,
    });
  };

  const handlePortfolioPop = () => {
    setPop({
      portfolioPop: !pop.portfolioPop,
    });
  };

  return (
    <div className="body-section-right">
      <div className="bsr1">
        <h2 style={{ width: "415px", fontSize: "1.2em", fontWeight: "bold" }}>
          Project Management | Bootstrap, C#, CSS 3, CSS, Database, Firebase{" "}
          <CreateTwoToneIcon
            onClick={handleTitlePop}
            style={{ marginLeft: "20px", cursor: "pointer" }}
          />
        </h2>
        <h3>
          $10.00/hr{" "}
          <CreateTwoToneIcon
            onClick={handleRatePop}
            style={{ marginLeft: "20px", cursor: "pointer" }}
          />
        </h3>
      </div>
      <div className="bsr2">
        <br />
        <p>Objective</p>
        <br />
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
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Work History</h3>
        <p>
          No work yet. Once you start getting hired on Upwork, your work with
          clients will show up here.
        </p>
        <p className="bsr-search">Start your search</p>
        <br />
        <hr />
      </div>

      <div className="bsr4">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Portfolio</h3>
        <AddCircleOutlineIcon
          onClick={handlePortfolioPop}
          style={{ marginLeft: "20px", cursor: "pointer" }}
        />
      </div>

      <br />
      <div className="bsr5main">
        <div className="bsr5">
          {/* <AddBoxIcon className="portfolioIcon" />
          <p>
            Talent who add portfolios to their profile are more likely to win
            work. (+20%)
          </p>
          <p className="bsr-search">Add Search</p> */}
          <ul>
            {
              portfolioData && portfolioData.map((item,key)=>(
                <li key={key}>
                  {portfolioData.porname}
                  {portfolioData.porimage}
                </li>
              ))
            }
          </ul>
        </div>
        <hr />
      </div>
      {pop.titlePop ? <TitlePop handleClose={handleTitlePop} /> : null}
      {pop.ratePop ? <HourlyRatePop handleClose={handleRatePop} /> : null}
      {pop.portfolioPop ? (
        <PortfolioPop portfolioData setPortfolioData handleClose={handlePortfolioPop} />
      ) : null}
    </div>
  );
}

export default EmployeeBodyRight;
