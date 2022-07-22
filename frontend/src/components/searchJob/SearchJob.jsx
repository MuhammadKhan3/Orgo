import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "./searchjob.css";

function SearchJob() {
  const [favourite, setFavourite] = useState(false);
  const [active,setActive] = useState("1");

  const handleEvent=(e)=>{
    setActive(e.target.id)
  }

  const handleFavourite = () => {
    setFavourite(!favourite);
  };

  return (
    <div className="search-container">
      <div className="search-bar-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for job"
        />
      </div>
      <p style={{ color: "green" }}>Recent Search : mern stack</p>
      <br />
      <div className="available-job-container">
        <h1 style={{ fontSize: "1.3em", fontWeight: "600" }}>
          Jobs you might like
        </h1>
        <div className="job-search-nav">
          <button id={"1"} onClick={handleEvent} className={active === "1" ? "active" : undefined}>Best Matches</button>
          <button id={"2"} onClick={handleEvent} className={active === "2" ? "active" : undefined}>Most Recent</button>
          <button id={"3"} onClick={handleEvent} className={active === "3" ? "active" : undefined}>Saved Jobs(1)</button>
        </div>
        <hr />
        <div className="job-search-content">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h2
              style={{
                fontSize: "1.1em",
                fontWeight: "600",
                marginTop: "35px",
              }}
            >
              Full Stack Developer (reactjs +nextjs + nodejs)
            </h2>
            {favourite ? (
              <FavoriteIcon
                onClick={handleFavourite}
                style={{
                  marginTop: "35px",
                  marginRight: "80px",
                  cursor: "pointer",
                  color: "green",
                }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={handleFavourite}
                style={{
                  marginTop: "35px",
                  marginRight: "80px",
                  cursor: "pointer",
                  color: "green",
                }}
              />
            )}
          </div>

          <p style={{ marginTop: "10px" }}>
            <span>Fixed-price</span> - Expert - Est.Budget
          </p>
          <p style={{ marginTop: "10px" }}>
            Hi, Here I am looking to hire developers on remote bases for my
            projects on monthly fixed prices INR salary for the long term as
            long as project will go the developer will get paid full-time Monday
            to Friday monthly bases. We will make sign contract between us so
            developer salary I will pay to you only. the developer can't leave
            before 6 months. Before leaving
          </p>
          <div className="required-skills">
            <button className="skillsButton">JavaScript</button>
            <button className="skillsButton">Node.js</button>
            <button className="skillsButton">CSS</button>
            <button className="skillsButton">HTML</button>
          </div>
          <br />
          <p>Proposals : 15 to 20</p>
        </div>
      </div>
    </div>
  );
}

export default SearchJob;
