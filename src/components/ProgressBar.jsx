import React from "react";

const ProgressBar = ({ progress, color }) => {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow="75"
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ height: 5 }}
    >
      <div
        className={`progress-bar bg-${color ? color : "primary"}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
export default ProgressBar;
