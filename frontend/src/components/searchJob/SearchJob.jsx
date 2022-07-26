import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useSelector,useDispatch} from 'react-redux';
import { formatDistance, subDays } from 'date-fns'
import { parseISO } from "date-fns";
import {Cookies} from 'react-cookie';
import {job_action} from '../redux/slice/jobSlice';
import "./searchjob.css";
import axios from 'axios'
import FetchJob from "../redux/thunk/fetchJob";
import  format from 'date-fns/format'

function SearchJob() {
  const dispatch=useDispatch();
  const jobs=useSelector(state=>state.jobSlice.jobs);
  const searches=useSelector(state=>state.jobSlice.searches);

  const [favourite, setFavourite] = useState(false);
  const [active,setActive] = useState("1");
  const cookies=new Cookies();

  const handleEvent=(e)=>{
  }

  const handleFavourite = (jobId,employeeId) => {
    console.log('fav')
    setFavourite(jobId);
    const userId=cookies.get('userId');
    const token=cookies.get('token');

    axios.post(`http://localhost:8000/fav-job/${jobId}`,{
      userId,
      headers:{
        authorization:"Bearer "+token,
      }
    })
  };

  const savedhandler=(e)=>{
    setActive(e.target.id);
    const token=cookies.get('token');
    const userId=cookies.get('userId');

    axios.post(`http://localhost:8000/fav-jobs`,{
      userId,
      headers:{
        authorization:"Bearer "+token,
      }
    }).then((response)=>{
      console.log(response)
      dispatch(job_action.setjobs(response.data.jobs))
    })
  }

  const mostrecenthandler=(e)=>{
    setActive(e.target.id);
    dispatch(FetchJob())
  } 

  const Searchhandler=(e)=>{
  
    if(e.key==='Enter'){
        const token=cookies.get('token');
        const userId=cookies.get('userId');
        const search=e.target.value
        axios.post('http://localhost:8000/search-jobs',{
          userId,
          search,
          headers:{
            token:'Bearer '+token
          }
        })
        .then((response)=>{
          console.log(response)
          dispatch(job_action.setjobs(response.data.jobs))
        })
    }
  }

  const bestmatchhandler=(e)=>{
    const token=cookies.get('token');
    const userId=cookies.get('userId');
    
    axios.post('http://localhost:8000/bestmatch-jobs',{
      userId,
      headers:{
        token:'Bearer '+token
      }
      
    }).then((response)=>{
      setActive(e.target.id);
      dispatch(job_action.setjobs(response.data.jobs))
      console.log(response)
    })
}
  

  return (
    <div className="search-container">
      <div className="search-bar-container">
        <input
          className="search-input"
          type="text"
          onKeyDown={Searchhandler}
          placeholder="Search for job"
        />
      </div>
      <p style={{ color: "green" }}>Recent Search : {searches.map((value)=>{
        return <span key={value._id} style={{marginLeft:'5px'}}>{value.search},</span>
      })}
      </p>
      <br />
      <div className="available-job-container">
        <h1 style={{ fontSize: "1.3em", fontWeight: "600" }}>
          Jobs you might like
        </h1>
        <div className="job-search-nav">
          <button id={"1"} onClick={mostrecenthandler} className={active === "1" ? "active" : undefined}>Recent Job</button>
          <button id={"2"} onClick={bestmatchhandler} className={active === "2" ? "active" : undefined}>Best Matches</button>
          <button id={"3"} onClick={savedhandler} className={active === "3" ? "active" : undefined}>Saved Jobs</button>
        </div>
        {/* job */}
        {jobs && jobs.map((job,i)=>{
          return (<div key={i}>
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
                          {job.category} ({job.heading})
                        </h2>

                        {favourite===job._id ? (
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
                            onClick={()=>{handleFavourite(job._id,job.employeeId)}}
                            style={{
                              marginTop: "35px",
                              marginRight: "80px",
                              cursor: "pointer",
                              color: "green",
                            }}
                          />
                        )}
                      </div>
                      <p>

                        {formatDistance( new Date(job.createdAt), new Date(), { addSuffix: true })}
                      </p>
                      <p style={{ marginTop: "10px" }}>
                        <span>Budget-price</span> -{job.budget.min}$ - {job.budget.max}$
                      </p>
                      <p style={{ marginTop: "10px" }}>
                        {job.description}
                      </p>
                      <div className="required-skills">
                        {job.skills.map((skill,i)=>{
                           return <button key={skill+i} className="skillsButton">{skill.name}</button>
                        })}
                      </div>
                      <br />
                      <p>Proposals : 15 to 20</p>
                    </div>
          </div>)
        })}        
        {/* job */}
      </div>
    </div>
  );
}

export default SearchJob;
