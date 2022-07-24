import React from "react";
import Multiselect from "multiselect-react-dropdown";
import '../components/multiSelection.css'

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
  function onSelect(selectedList, selectedItem) {
    console.log("Hello");
  }
  function onRemove(selectedList, removedItem) {
    console.log("Hello");
  }
  return (
    <Multiselect
      className="multi-select"
      options={state.options} // Options to display in the dropdown
      selectedValues={state.selectedValue} // Preselected value to persist in dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
    />
  );
}

export default MultiSelection;
