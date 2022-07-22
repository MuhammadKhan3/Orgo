import React from "react";
import CreateTwoTone from "@mui/icons-material/CreateTwoTone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import "../client/clientHeader.css";
import { useState } from "react";
import CompanyPop from "../popups/CompanyPop";
import CompContactPop from "../popups/CompContactPop";
import {useSelector,useDispatch} from 'react-redux';


function CompanyDetails() {
  const companyName=useSelector(state=>state.companySlice.companyname);
  const timezone=useSelector(state=>state.companySlice.timezone);
  const phone=useSelector(state=>state.companySlice.phone);
  const country=useSelector(state=>state.companySlice.country);
  const ownerName=useSelector(state=>state.companySlice.ownername);



  const [pop,setPop]=useState({
    companyNamePop:false,
    infoPop:false
  })

  const handleCompanyNamePop=()=>{
    setPop({
      companyNamePop:!pop.companyNamePop
    })
  }

  const handleCompanyInfoPop=()=>{
    setPop({
      infoPop:!pop.infoPop
    })
  }
  return (
    <div className="company-details">
      <div className="client-top-header">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Company</h3>
        <CreateTwoTone onClick={handleCompanyNamePop} style={{cursor:"pointer"}} />
      </div>
      <hr />
      <div className="company-logo">
        <ApartmentIcon className="comp-icon" />
      </div>
      <hr />
      <p style={{ padding: "15px", fontSize: "0.9em" }}>{companyName}</p>
      <hr />
      <div className="company-info">
        <div className="company-contact">
          <p style={{ fontSize: "0.9em", fontWeight: "bold" }}>
            Company contacts
          </p>
          <CreateTwoTone onClick={handleCompanyInfoPop} style={{cursor:"pointer"}} />
        </div>
      </div>
      <hr />
      <div className="company-detail">
        <p>Owner</p>
        <p>{ownerName}</p>
      </div>
      <hr />
      <div className="company-detail">
        <p>Phone</p>
        <p>{phone}</p>
      </div>
      <hr />
      <div className="company-detail">
        <p>Time zone</p>
        <p>{timezone}</p>
      </div>
      <hr />
      <div className="company-detail">
        <p>Address</p>
        <p>{country}</p>
      </div>
      <hr />
      {pop.companyNamePop ? <CompanyPop handleClose={handleCompanyNamePop}/> : null}
      {pop.infoPop ? <CompContactPop handleClose={handleCompanyInfoPop} />:null}
    </div>
  );
}

export default CompanyDetails;
