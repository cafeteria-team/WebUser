import React, { useState } from "react";
import { CardMenu } from "../../views";
import MapContainer from "../mapContainer/mapContainer";

const MainPage = () => {
  return (
    <>
      <CardMenu />
      <CardMenu />
      <MapContainer />
    </>
  );
};

export default MainPage;
