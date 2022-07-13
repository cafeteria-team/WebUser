import React from "react";
import CardMenu from "./cardMenu";
import { v4 as uuidv4 } from "uuid";

const CardLoader = () => {
  const loadingArray = [
    {
      name: "loading",
    },
    {
      name: "loading",
    },
    {
      name: "loading",
    },
  ];

  return loadingArray.map((item) => (
    <CardMenu loading="true" name={item.name} key={uuidv4()} />
  ));
};

export default CardLoader;
