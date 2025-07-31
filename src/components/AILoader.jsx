import React from "react";
import "@/components/AILoader.css";
const AILoader = ({ isActive = false }) => {
  return (
    <div
      className={`componentlab-loader-overlay ${isActive ? "is-active" : ""}`}
    >
      <div className="loader-pulse"></div>
      <div className="loader-content"></div>
    </div>
  );
};

export default AILoader;
