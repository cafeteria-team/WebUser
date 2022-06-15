import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../../_modules/location";
import { MapView } from "../../views";
import { CardContainer, MapTitle } from "../../styles/styledElements";

const { kakao } = window;

const MapPage = () => {
  // set dispatch
  const dispatch = useDispatch();

  const [isMapLoading, setIsMapLoading] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const [coordinate, setCoordinate] = useState({
    // 지도의 초기 위치
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
    isPanto: true,
  });

  // find region
  const searchAddressFromCode = () => {
    const geocoder = new kakao.maps.services.Geocoder();

    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = result[0];
        _setLocation(
          `${newSearch.region_2depth_name} ${newSearch.region_3depth_name}`
        );
      } else {
        alert("정확한 주소를 입력해주세요. 예)강남구, 은평구, 갈현동");
      }
    };
    geocoder.coord2RegionCode(
      coordinate.center.lng,
      coordinate.center.lat,
      callback
    );
  };

  // save region to session storage
  const _setLocation = (region) => {
    dispatch(setCurrentLocation(region));
  };

  useEffect(() => {
    searchAddressFromCode();
  }, []);

  return (
    <CardContainer>
      <MapTitle>서울 금천구 가산동</MapTitle>
      <MapView location={coordinate} height />
    </CardContainer>
  );
};

export default MapPage;
