import React from "react";
import "../button/button.css";

function Button({ content, handle }) {
  return (
    <>
      <button className="custom-button" onClick={handle}>
        {content}
      </button>
    </>
  );
}

export default Button;
