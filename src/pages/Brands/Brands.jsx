import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useHistory } from "react-router";

const Brands = () => {
  const history = useHistory();
  const [brands, setBrands] = useState(null);
  useEffect(() => {
    const getBrands = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/brands",
        header: { "Access-Control-Allow-Origin": "*" },
      });
      setBrands(response.data);
    };
    getBrands();
    // eslint-disable-next-line
  }, []);

  return brands ? (
    <div
      className="w-100 d-flex flex-column flex-md-row justify-content-center align-items-center"
      style={{ height: `100vh`, overflow: `auto` }}
    >
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="border border-dark p-4 m-2 d-flex flex-column"
          style={{ width: `20rem` }}
        >
          <span className="d-block titles-commerce fs-2 fw-bold mb-3 w-100 text-center">
            {brand.name}
          </span>
          <button className="btn btn-dark titles-commerce rounded-0" onClick={() => { history.push(`/brands/${brand.name}`) }}>
            Catalogue
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: `100vh` }}
    >
      <Loader color="#000" />
    </div>
  );
};

export default Brands;
