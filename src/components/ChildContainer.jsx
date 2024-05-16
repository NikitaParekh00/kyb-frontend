import React from "react";

const ChildContainer = ({ name, number }) => {
  return (
    <div className={`child ${name}`}>
      <h1>Box {number}</h1>      
    </div>
  );
};

export default ChildContainer;