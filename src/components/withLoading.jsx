import React from "react";

export default function withLoading(WrappedComponent, msg = "...로딩중") {
  return function withLoading({ isLoading, ...props }) {
    if (isLoading) {
      return msg;
    }

    return <WrappedComponent {...props} />;
  };
}
