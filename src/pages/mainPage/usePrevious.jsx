import { useRef, useEffect } from "react";

function UsePrevious(value) {
  const ref = useRef();

  useEffect((_) => {
    ref.current = JSON.parse(JSON.stringify(value));
  });

  return ref.current;
}

export default UsePrevious;
