import React,{useState,useEffect} from "react";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TitlePop from "../popups/TitlePop";
import HourlyRatePop from "../popups/HourlyRatePop";
import PortfolioPop from "../popups/PortfolioPop";
import {useDispatch,useSelector} from 'react-redux'

function EmployeeBodyRight() {
  const rate=useSelector(state=>state.companySlice.rate);
  const title=useSelector(state=>state.companySlice.title);
  const description=useSelector(state=>state.companySlice.description);
  const portfolio=useSelector(state=>state.companySlice.portfolio);
  console.log(portfolio)
  
  const [pop,setPop]=useState({
    titlePop:false,
    ratePop:false,
    portfolioPop:false
  })

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
      portfolioPop:!pop.portfolioPop
    })
  }

  return (
    <div className="body-section-right">
      <div className="bsr1">
        <h2 style={{ width: "415px", fontSize: "1.2em", fontWeight: "bold" }}>
          {title}{" "}
          <CreateTwoToneIcon
            onClick={handleTitlePop}
            style={{ marginLeft: "20px", cursor: "pointer" }}
          />
        </h2>
        <h3>
          ${rate}.00/hr <CreateTwoToneIcon onClick={handleRatePop} style={{ marginLeft: "20px", cursor:"pointer"}} />
        </h3>
      </div>
      <div className="bsr2">
        <br />
        <p>Objective</p>
        <br />
        <p style={{ marginBottom: "30px" }}>
          {description}
        </p>
        <hr />
      </div>

      {/* <div className="bsr3">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Work History</h3>
        <p>
          No work yet. Once you start getting hired on Upwork, your work with
          clients will show up here.
        </p>
        <p className="bsr-search">Start your search</p>
        <br />
        <hr />
      </div> */}

      <div className="bsr4">
        <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Portfolio</h3>
        <AddCircleOutlineIcon
          onClick={handlePortfolioPop}
          style={{ marginLeft: "20px", cursor: "pointer" }}
        />
      </div>
      <div className="bsr5main">
        <div className="bsr5">
          <ul style={{width:"100%"}}>
            {portfolio.length>0 && portfolio.map((data,i)=>{
              return <>
                <li style={{display:"flex", flexDirection:"row", justifyContent:"space-around", width:"100%"}}>
                  <p>{i+1}</p>
                  <p>{data.title}</p>
                  <img src={`http://localhost:8000/${data.file}`} style={{width:'100px',height:'80px'}} />
                </li>
              </>
            })
              }
            {/* {
              portfolioData && portfolioData.map((item,key)=>(
                <li key={key}>
                  {portfolioData.porname}
                  {portfolioData.porimage}
                </li>
              ))
            } */}
          </ul>
        </div>
        <hr />
      </div>
      {pop.titlePop ? <TitlePop handleClose={handleTitlePop}/>:null}
      {pop.ratePop ? <HourlyRatePop handleClose={handleRatePop}/>:null}
      {pop.portfolioPop ? <PortfolioPop handleClose={handlePortfolioPop}/>:null}

    </div>
  );
}

export default EmployeeBodyRight;
