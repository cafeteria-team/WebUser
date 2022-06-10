import React from "react";

export default function withLoading(WrappedComponent) {
  return function withLoading({ isLoading, ...props }) {
    if (isLoading) {
      return "로딩중...";
    }

    return <WrappedComponent {...props} />;
  };
}
