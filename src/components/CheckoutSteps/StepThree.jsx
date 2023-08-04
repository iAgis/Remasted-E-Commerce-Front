import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useUserAuth } from "../../hooks/userHook";
import axios from "axios";
import Loader from "../Loader/Loader";

const StepThree = ({ step, setStep, formData, shoppingCart }) => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  function handlePayNow(e) {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url: process.env.REACT_APP_DOMAIN + "/orders",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user.token}`,
        Authorization2: `${process.env.REACT_APP_ULTRA_SECRET_TOKEN}`,
      },
      data: {
        ...formData,
        items: shoppingCart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setSuccess(true);
          dispatch({ type: "EMPTY_CART" });
          history.push(`/order/user/${response.data.id}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        setSuccess(false);
        dispatch({ type: "EMPTY_CART" });
      });
  }
  return !success ? (
    <>
      <div
        className="p-3 d-flex flex-column position-relative"
        style={{ backgroundColor: `lightgray` }}
      >
        <h6 className="titles-commerce fw-bold">Order Details</h6>
        {user ? (
          <ul>
            <li>Checkout as: {formData.guest ? "Guest" : "Customer"}</li>
            <li>Firstname: {user.firstname}</li>
            <li>Lastname: {user.lastname}</li>
            <li>E-mail: {user.email}</li>
            <li>Phone: {formData.phone}</li>
            <li>Shipping Address: {formData.address}</li>
            <li>Payment Method: {formData.paymentMethod}</li>
          </ul>
        ) : (
          <div
            className="w-100 d-flex align-items-center justify-content-center"
            style={{ height: `10vh` }}
          >
            <Loader color="#000" />
          </div>
        )}
        <button
          className="btn btn-outline-dark position-absolute top-0 rounded-0 mt-4 me-4"
          style={{ right: 0 }}
          onClick={() => setStep(1)}
        >
          <i className="far fa-edit"></i>
        </button>
      </div>
      <button
        className="btn btn-dark titles-commerce rounded-0 w-100 mt-3"
        onClick={(e) => handlePayNow(e)}
        disabled={loading}
      >
        {loading ? "PROCESSING PAYMENT..." : "Pay Now"}
      </button>
      <button
        className="btn bg-white text-dark border border-dark titles-commerce rounded-0 w-100"
        disabled={loading}
        onClick={() => setStep((prev) => prev - 1)}
      >
        Go back
      </button>
    </>
  ) : (
    <>Thank you so much for purchase our cars.</>
  );
};

export default StepThree;
