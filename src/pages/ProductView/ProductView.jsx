import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MightLike from "../../components/MightLike/MightLike";

const ProductView = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const notify = () =>
    toast.dark("Item added successfully", {
      position: "bottom-left",
    });
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/products/" + slug,
        header: { "Access-Control-Allow-Origin": "*" },
      });
      setProduct(response.data);
    };
    getProduct();
  }, [slug]);
  return product ? (
    <div className="container d-flex flex-column mt-5 py-5">
      <div className="row g-5">
        <div className="col-12 col-md-6 bg-white">
          <div
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
              height: `25rem`,
            }}
            className="w-100"
          ></div>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column ">
          <div className="titles-commerce fw-bold fs-2">{product.name}</div>
          <div className="titles-commerce fs-5">U$S {product.price}</div>
          <hr />
          <div className="flex-grow-1 my-3 p-3 shadow">
            {product.description}
          </div>
          <div className="d-flex flex-row align-items-center bg-dark p-2">
            <span className="d-block flex-grow-1">
              <input
                type="number"
                name="quantity"
                id="quantity"
                defaultValue={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-transparent text-white border border-white text-center"
                min={1}
              />
            </span>
            <button
              className="btn btn-light rounded-0 titles-commerce"
              onClick={() => {
                dispatch({
                  type: "ADD_ITEM",
                  payload: { product: product, quantity: Number(quantity) },
                });
                notify();
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <MightLike brand={product.brand.name} slug={product.slug} />
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

export default ProductView;
