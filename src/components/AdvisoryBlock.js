import React from "react";
import './BlockStyles.css'; 

function AdvisoryBlock({ advise }) {

  return (
    <div className="block-advisory">
      <h2>Advisory</h2>
      <p>{advise}</p>
    </div>
  );
}

export default AdvisoryBlock;
