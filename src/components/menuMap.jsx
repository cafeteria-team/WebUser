import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../_modules/location";
import { MapView } from "../views";
import {
  CardContainer,
  MenuMapTitle,
  Paragraph,
} from "../styles/styledElements";
import { Location } from "../assets/icons";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";

const { kakao } = window;

const MenuMap = ({ addr, height, latitude, longitude }) => {
  // set dispatch
  const dispatch = useDispatch();

  const [coordinate, setCoordinate] = useState(
    latitude
      ? {
          center: { lat: latitude, lng: longitude },
          // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
          isPanto: true,
        }
      : {
          // 지도의 초기 위치
          center: { lat: 37.49676871972202, lng: 127.02474726969814 },
          // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
          isPanto: true,
        }
  );

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

  const copyToaster = () => {
    NotificationManager.success("주소가 복사되었습니다.", "", 1000);
  };

  useEffect(() => {
    searchAddressFromCode();
  }, []);

  return (
    <CardContainer marginTop="0px" padding="unset" radi="8px" boxShadow="unset">
      <MapView
        location={coordinate}
        height={height}
        radi="8px"
        draggable={false}
      />
      <NotificationContainer />
      <MenuMapTitle>
        <Location color="#1A90FF" />
        {addr}
        <CopyToClipboard
          options={{ message: "" }}
          text={addr}
          onCopy={() => copyToaster()}
        >
          <Paragraph
            fontSize="14px"
            color="#1A90FF"
            margin="0 0 0 12px"
            cursor="pointer"
          >
            주소복사
          </Paragraph>
        </CopyToClipboard>
      </MenuMapTitle>
    </CardContainer>
  );
};

export default MenuMap;
