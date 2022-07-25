import React from "react";
import Multiselect from "multiselect-react-dropdown";
import '../components/multiSelection.css'
import {useDispatch,useSelector} from 'react-redux';
import { job_action } from "./redux/slice/jobSlice";
const state = {
  
  options: [
    { name: "React", id: 1 },
    { name: "Node", id: 2 },
    { name: "MongoDB", id: 3 },
    { name: "Css", id: 4 },
    { name: "Java", id: 5 },
    { name: "Java", id: 6 },
    { name: "Java", id: 7 },
    { name: "Java", id: 8 },
    
  ],
};

function MultiSelection() {
  const dispatch=useDispatch();
  const skill=useSelector(state=>state.jobSlice.skill);
  function onSelect(selectedList, selectedItem) {
    dispatch(job_action.setskill(selectedList))
  }
  function onRemove(selectedList, removedItem) {
    console.log(selectedList);
    dispatch(job_action.setskill(selectedList))
  }
  return (
    <Multiselect
      className="multi-select"
      options={state.options} // Options to display in the dropdown
      selectedValues={skill} // Preselected value to persist in dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
    />
  );
}

export default MultiSelection;
