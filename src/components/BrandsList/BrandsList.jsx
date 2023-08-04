import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import Loader from "../Loader/Loader";

const BrandsList = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/products",
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      setProducts(response.data);
    };
    getProducts();
    // eslint-disable-next-line
  }, []);

  return products ? (
    <>
      {products.length > 0 ? (
        <div className="position-relative">
          <div
            id="brandContainer"
            className="container-fluid p-0 overflow-hidden"
          >
            {products
              .filter((prod) => prod.featured === true)
              .map((prod, index) => (
                <Product
                  key={index}
                  image={prod.image}
                  price={prod.price}
                  name={prod.name}
                  prod={prod}
                  brand={prod.brand.name}
                />
              ))}
          </div>
        </div>
      ) : (
        <div
          className="w-100 d-flex align-items-center justify-content-center"
          style={{ height: `100vh` }}
        >
          <span className="titles-commerce fs-5">There's no products yet.</span>
        </div>
      )}{" "}
    </>
  ) : (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: `100vh` }}
    >
      <Loader color="#000" />
    </div>
  );
};

export default BrandsList;
