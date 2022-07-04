import React, { useState, useEffect } from "react";
import { CardDetail } from "../../views";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utills/axios";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const StorePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [stores, setStores] = useState([]);
  const [notice, setNotice] = useState(null);

  const { storeId } = useParams();

  const goMapPage = (addr, height) => {
    navigate("address", { state: { addr: addr, height: height } });
  };

  const getStoresData = (date) => {
    setIsLoading(true);
    try {
      axios
        .all([
          axiosInstance.get(
            `/api/menu/${storeId}?provide_at=${date}&page=1&page_size=10`
          ),
          axiosInstance.get(`/api/notice/${storeId}`),
        ])
        .then(
          axios.spread(({ data: { results } }, { data: { content } }) => {
            setStores(results[0]);
            setNotice(content);
            setIsLoading(false);
          })
        );
    } catch (err) {
      alert("리스트를 불러올수없습니다. 잠시후 다시 시도해주십시오.");
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    getStoresData(today);
  }, []);

  return (
    <>
      <CardDetail
        mapOpen={goMapPage}
        isLoading={isLoading}
        stores={stores}
        notice={notice}
      />
    </>
  );
};

export default StorePage;
