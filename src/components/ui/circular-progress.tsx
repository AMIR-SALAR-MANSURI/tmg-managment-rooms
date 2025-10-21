import React from "react";

const LinearIndeterminate = () => {
  return (
    <div className="relative w-full h-1 overflow-hidden bg-gray-200 rounded">
      <div className="absolute top-0 left-0 w-full h-full">
        <span className="bar1 absolute h-full bg-primary rounded"></span>
        <span className="bar2 absolute h-full bg-primary rounded"></span>
      </div>

      <style jsx>{`
        .bar1 {
          animation: indeterminate1 2s infinite;
        }

        .bar2 {
          animation: indeterminate2 2s infinite;
        }

        @keyframes indeterminate1 {
          0% {
            left: -35%;
            width: 30%;
          }
          60% {
            left: 100%;
            width: 30%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }

        @keyframes indeterminate2 {
          0% {
            left: -200%;
            width: 100%;
          }
          60% {
            left: 107%;
            width: 10%;
          }
          100% {
            left: 107%;
            width: 10%;
          }
        }
      `}</style>
    </div>
  );
};

export default LinearIndeterminate;
