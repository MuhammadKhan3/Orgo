import  React,{useEffect,useState} from 'react';
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { user_action } from "../redux/slice/userSlice";
import { useDispatch, useSelector} from "react-redux";


export default function SelectCompany(props) {
  const [age, setAge] = React.useState('');
  const [companies,setcompanies]=useState([])
  const dispatch=useDispatch();
  const company=useSelector(state=>state.userSlice.company);
  const handleChange = (event) => {
    dispatch(user_action.setCompany(event.target.value))
  };
  
  useEffect(()=>{
    const fetchCompany= async ()=>{
        const response=await axios.get('http://localhost:8000/get-company');
        setcompanies(response.data.company);
    }
    fetchCompany();
  },[])

  return (
    <div >
      <FormControl sx={{ m: 1,marginTop:'40px', minWidth: 160 }} style={props.style} >
        <InputLabel id="demo-simple-select-autowidth-label">Select Company</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={company}
          style={props.height}
          onChange={handleChange}
          autoWidth
          label="Select Company"
        >
            {companies.map((value,i)=>{
               return <MenuItem key={i} value={value.companyName} style={{marginLeft:'30px'}}>{value.companyName}</MenuItem>
            })}
        </Select>
      </FormControl>
    </div>
  );
}
