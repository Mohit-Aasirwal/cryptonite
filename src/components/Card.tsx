import React from "react";

const Card = ({ children }: any) => {
  return (
    <div className="glassmorphic border border-blue-800 p-5 rounded-xl w-full h-full">{children}</div>
  );
};

export default Card;
