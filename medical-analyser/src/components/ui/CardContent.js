import React from "react";

const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`overflow-auto ${className}`}>
      {children}
    </div>
  );
};

export default CardContent; 