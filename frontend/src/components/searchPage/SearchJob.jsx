import React from "react";
import "../searchPage/searchjob.css";

function SearchJob() {
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
          <h3 style={{ fontWeight: "700" }}>Best Matches</h3>
          <h3 style={{ fontWeight: "700" }}>Most Recent</h3>
          <h3 style={{ fontWeight: "700" }}>Saved Jobs(1)</h3>
        </div>
        <hr />
        <div className="job-search-content">
          <h2 style={{ fontSize: "1.1em", fontWeight: "600", marginTop:'35px' }}>
            Full Stack Developer (reactjs +nextjs + nodejs)
          </h2>
          <p style={{marginTop:'10px'}}>
            <span>Fixed-price</span> - Expert - Est.Budget
          </p>
          <p style={{marginTop:'10px'}}>
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
