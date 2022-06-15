import React, { useState } from "react";
import { CardDetail } from "../../views";
import { useNavigate } from "react-router-dom";

const StorePage = () => {
  const navigate = useNavigate();

  const goMapPage = () => {
    navigate("address");
  };

  return (
    <>
      <CardDetail mapOpen={goMapPage} />
    </>
  );
};

export default StorePage;
