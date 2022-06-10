import React from "react";

export default function WithError(WrappedComponent) {
  return function WithError({ errorMessage, ...props }) {
    return (
      <>
        <WrappedComponent />
        {errorMessage && <span>{errorMessage}</span>}
      </>
    );
  };
}
