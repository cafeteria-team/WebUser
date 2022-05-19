import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapView = ({ location }) => {
  return (
    <Map // 지도를 표시할 Container
      center={location.center}
      isPanto={location.isPanto}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
        borderRadius: "20px",
      }}
      level={4} // 지도의 확대 레벨
    >
      <MapMarker
        position={location.center}
        draggable={true} // 마커가 드래그 가능하도록 설정합니다
        image={{
          src: require("../assets/images/marker.png"), // 마커이미지의 주소입니다
          size: {
            width: 60,
            height: 60,
          }, // 마커이미지의 크기입니다
          options: {
            offset: {
              x: 27,
              y: 69,
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      ></MapMarker>
    </Map>
  );
};

export default MapView;
