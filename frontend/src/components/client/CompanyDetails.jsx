import React from "react";
import CreateTwoTone from "@mui/icons-material/CreateTwoTone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "../client/clientHeader.css";
import { useState } from "react";

function CompanyDetails() {
  const [selectedTimezone, setSelectedTimezone] = useState({});

  return (
    <div className="company-details">
      <div className="client-top-header">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Company</h3>
        <CreateTwoTone />
      </div>
      <hr />
      <div className="company-logo">
        <ApartmentIcon className="comp-icon" />
      </div>
      <hr />
      <p style={{ padding: "15px", fontSize: "0.9em" }}>Muhammad Osama</p>
      <hr />
      <div className="company-info">
        <div className="company-contact">
          <p style={{ fontSize: "0.9em", fontWeight: "bold" }}>
            Company contacts
          </p>
          <CreateTwoTone />
        </div>
      </div>
      <hr />
      <div className="company-detail">
        <p>Owner</p>
        <p>muhammadosama3556@gmail.com</p>
      </div>
      <hr />
      <div className="company-detail">
        <p>Phone</p>
        <p>0304xxxxxxx</p>
      </div>
      <hr />
      <div className="company-detail">
        <p>Time zone</p>
        <p>UTC 5:00 Islamabad, Pakistan</p>
      </div>
      <hr />
      <div className="company-detail">
        <p>Address</p>
        <p>Pakistan</p>
      </div>
      <hr />
    </div>
  );
}

export default CompanyDetails;
