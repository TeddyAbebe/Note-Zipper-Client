import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <div>
      <Alert
        variant={variant}
        className="text-sm m-0 w-44 p-2 font-serif animate-bounce"
      >
        <strong>{children}</strong>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
