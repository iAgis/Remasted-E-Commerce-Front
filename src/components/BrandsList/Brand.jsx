import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Carousel from "../Carousel/Carousel";
import { useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
const BrandsMain = () => {
  const { brand } = useParams();
  const history = useHistory();
  const [brands, setBrands] = useState(null);
  const [products, setProducts] = useState(null);
  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
  useEffect(() => {
    const getBrands = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/brands/" + brand,
        header: { "Access-Control-Allow-Origin": "*" },
      });
      setBrands(response.data);
    };
    const getProducts = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/products",
        header: { "Access-Control-Allow-Origin": "*" },
      });
      setProducts(response.data);
    };
    getProducts();
    getBrands();
  }, [brand]);
  return products ? (
    brands ? (
      <div className="d-flex flex-column pb-5">
        {products ? (
          <Carousel>
            {products
              .filter((product) => product.brand.name === capitalize(brand))
              .map((product, index) => (
                <div
                  key={product.id}
                  className={`carousel-item ${index === 0 && `active`}`}
                >
                  <div
                    className="d-block w-100"
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundPosition: `center`,
                      backgroundSize: `cover`,
                      height: `30rem`,
                    }}
                  />
                </div>
              ))}
          </Carousel>
        ) : (
          <div>Loading</div>
        )}
        <div className="container">
          {products ? (
            <div className="row g-4 mt-5">
              {products
                .filter((product) => product.brand.name === capitalize(brand))
                .map((product) => (
                  <div key={product.id} className="col-12 col-md-6 col-lg-4">
                    <div className="d-flex flex-column border border-dark p-3 shadow h-100">
                      <div
                        className="d-block w-100 p-3"
                        style={{
                          backgroundImage: `url(${product.image})`,
                          backgroundPosition: `center`,
                          backgroundSize: `cover`,
                          height: `20rem`,
                        }}
                      >
                        <span className="bg-dark text-white p-2">
                          ${product.price}
                        </span>
                      </div>
                      <div className="my-2 d-flex flex-row align-items-center">
                        <span className="titles-commerce fw-bold fs-4">
                          {product.name}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          history.push(`/brands/${brand}/${product.slug}`)
                        }
                        className="btn btn-dark rounded-0 titles-commerce mt-auto"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    ) : (
      <div
        className="w-100 d-flex align-items-center justify-content-center"
        style={{ height: `100vh` }}
      >
        <Loader color="#000" />
      </div>
    )
  ) : (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: `100vh` }}
    >
      <Loader color="#000" />
    </div>
  );
};

export default BrandsMain;
