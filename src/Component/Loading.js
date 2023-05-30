import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ size = 20 }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
  );
};

export default Loading;
