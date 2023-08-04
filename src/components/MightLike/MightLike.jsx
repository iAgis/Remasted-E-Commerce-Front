import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

function MightLike({ brand, slug }) {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/products",
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      setProducts(
        response.data.filter((product) => product.brand.name === brand)
      );
    };
    getProducts();
    // eslint-disable-next-line
  }, []);
function shortName(name) {
    return name.replaceAll("\\s+\\w+$", "");
}
  return (
    <div className="d-flex flex-column mt-5">
      <div className="titles-commerce fw-bold fs-5">You Might Like</div>
      <hr />
      <div
        className={`d-flex flex-row w-100 mt-3 align-items-center`}
        style={{ overflowX: "auto", height: "15rem" }}
      >
        {products ? (
          products
            .filter((product) => product.slug !== slug)
            .map((product) => (
              <div
              key={product.id}
                className="h-100 border bg-white me-3 p-2 d-flex flex-column"
                style={{ width: "15rem" }}
              >
                <div
                  className="w-100"
                  style={{
                    height: "8rem",
                    backgroundImage: `url("${product.image}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div className="titles-commerce fw-bold mt-1 flex-grow-1">
                  {shortName(product.name)}
                </div>
                <Link
                  to={`/brands/${brand}/${product.slug}`}
                  className="btn btn-dark rounded-0 titles-commerce fs-7 border-white px-4"
                >
                  BUY NOW
                </Link>
              </div>
            ))
        ) : (
          <div className="w-100 text-center">
            <Loader color="#000" />
          </div>
        )}
      </div>
    </div>
  );
}

export default MightLike;
