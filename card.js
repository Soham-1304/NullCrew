import React from "react";

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`p-4 border rounded-lg shadow bg-white ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;