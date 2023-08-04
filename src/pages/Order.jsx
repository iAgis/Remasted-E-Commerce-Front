import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";

const Order = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  const notify = () => toast.error("Server Error to try Get Order!");

  useEffect(() => {
    const getOrder = () => {
      setOrder(null);
      axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/orders/user/" + id,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          setOrder(response.data);
        })
        .catch((error) => {
          notify();
          setOrder(null);
        });
    };
    getOrder();
    setInterval(() => {
      getOrder();
    }, 15000);
  }, [id, user]);
  return order ? (
    <div className="d-flex vh-100 w-100 flex-column align-items-center justify-content-center">
      <div className="p-4 d-flex flex-column border border-dark">
        <div className="d-flex flex-column flex-md-row border-bottom border-dark align-items-start align-items-md-center justify-content-between pb-2">
          <div className="d-block titles-commerce fw-bold fs-6">
            Order #{id} created
          </div>
          {order.status === "PENDING" ? (
            <span className="bg-warning text-dark rounded px-2 fw-bold fs-7">
              PENDING
            </span>
          ) : order.status === "COMPLETED" ? (
            <span className="bg-success text-white rounded px-2 fw-bold fs-7 text-white">
              COMPLETED
            </span>
          ) : order.status === "PAID" ? (
            <span className="bg-primary rounded px-2 fw-bold fs-7 text-white">
              PAID
            </span>
          ) : (
            <span className="bg-danger rounded px-2 fw-bold fs-7 text-white">
              CANCELLED
            </span>
          )}
        </div>
        <div className="mt-2" style={{ width: `20rem` }}>
          Thank you for your order, our team are working as fast they can to
          check the status. Once we've collected the whole information you will
          be able to see the order status above or you can check it in{" "}
          <Link to="/user">orders page</Link>.
        </div>
      </div>
    </div>
  ) : (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <Loader color="#000" />
    </div>
  );
};

export default Order;
