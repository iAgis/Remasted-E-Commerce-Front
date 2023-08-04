import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useUserAuth } from "../../hooks/userHook";
import axios from "axios";
import BtnUpdateUser from "../../components/Admin/BtnUpdateUser";
import { toast } from "react-toastify";
import formatDate from "../../utils/formatDate";

const Main = () => {
  const dispatch = useDispatch();
  const { user, setUser } = useUserAuth();
  const userState = useSelector((state) => state.user);
  const history = useHistory();
  const [orders, setOrders] = useState(null);
  const notify = () => toast.error("Server Error to try Get Orders!");

  useEffect(() => {
    const getOrders = () => {
      axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/orders/user",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${userState.token}`,
        },
      })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          notify();
        });
    };
    getOrders();
  }, [userState]);
  function handleLogOut() {
    dispatch({ type: "LOGOUT_USER" });
    history.push("/");
  }
  return (
    <>
      {user ? (
        <div className="container my-5 pt-5 w-100 vh-100">
          <div className="d-flex flex-column align-items-start">
            <div className="flex-grow-1 border border-dark rounded-0 p-3 flex flex-column w-100 position-relative">
              <span className="d-flex w-100 fw-bold titles-commerce border-bottom border-dark mb-3 pt-0 py-2 align-items-center">
                Information
                <span className="ms-auto d-flex flex-row align-items-center">
                  <BtnUpdateUser item={user} path="/user" setItem={setUser} />
                </span>
              </span>
              <span className="d-flex w-100 align-items-center mb-2">
                <i className="fad fa-user-circle me-2"></i>
                <span>
                  {user.firstname} {user.lastname}
                </span>
              </span>
              <span className="d-flex w-100 align-items-center mb-2">
                <i className="fad fa-envelope-square me-2"></i>
                <span>{user.email}</span>
              </span>
              <span className="d-flex w-100 align-items-center mb-2">
                <i className="fad fa-address-book me-2"></i>
                <span>{user.address}</span>
              </span>
              <span className="d-flex w-100 align-items-center">
                <i className="fad fa-phone-square-alt me-2"></i>
                <span>{user.telephone}</span>
              </span>
              <button
                onClick={() => handleLogOut()}
                className="btn btn-outline-danger titles-commerce rounded-0 fw-bold fs-7 m-3 position-absolute bottom-0"
                style={{ right: 0 }}
              >
                Log out
              </button>
            </div>
            <div
              className="flex-grow-1 shadow rounded-0 p-3 flex flex-column w-100 mt-3 overflow-auto"
              style={{ height: "50vh" }}
            >
              <span className="d-flex w-100 fw-bold titles-commerce border-bottom border-dark mb-3">
                My orders
              </span>
              {orders ? (
                <div className="accordion rounded-0" id="accordionOrders">
                  {orders.map((order) => (
                    <div className="accordion-item rounded-0" key={order.id}>
                      <h2
                        className="accordion-header"
                        id={`heading${order.id}`}
                      >
                        <button
                          className="btn w-100 d-flex flex-row align-items-center justify-content-between rounded-0"
                          style={{ backgroundColor: `#f0f0f0` }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${order.id}`}
                          aria-expanded="true"
                          aria-controls={`collapse${order.id}`}
                        >
                          <span className="titles-commerce text-dark fw-bold">
                            Order #{order.id}
                          </span>
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
                        </button>
                      </h2>
                      <div
                        id={`collapse${order.id}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`heading${order.id}`}
                        data-bs-parent="#accordionOrders"
                      >
                        <div className="accordion-body border-top d-flex flex-column">
                          <div className="d-flex flex-column flex-lg-row align-items-center pb-2 border-bottom border-dark">
                            <div className="flex-grow-1 d-flex flex-row align-items-center">
                              <span className="fs-7 titles-commerce">
                                Payment method
                              </span>
                              {order.paymentMethod === "paypal" ? (
                                <span className="ms-2 border border-dark rounded-0 px-2 fs-7 fw-bold titles-commerce">
                                  PayPal
                                </span>
                              ) : (
                                <span className="ms-2 border border-primary text-primary rounded-0 px-2 fs-7 fw-bold titles-commerce">
                                  Mercadopago
                                </span>
                              )}
                            </div>
                            <div className="flex-grow-1 d-flex flex-row align-items-center">
                              <span className="fs-7 titles-commerce">
                                # Products
                              </span>
                              <span className="ms-2 fs-7 fw-bold titles-commerce">
                                {order.products.length}
                              </span>
                            </div>
                            <div className="flex-grow-1 d-flex flex-row align-items-center">
                              <span className="fs-7 titles-commerce">
                                Created At
                              </span>
                              <span className="ms-2 fs-7 fw-bold titles-commerce">
                                {formatDate(order.createdAt)}
                              </span>
                            </div>
                          </div>
                          <table className="table table-responsive align-middle">
                            <thead>
                              <tr>
                                <th
                                  colSpan="2"
                                  className="titles-commerce fs-7"
                                >
                                  Product
                                </th>
                                <th className="titles-commerce fs-7">Price</th>
                                <th className="titles-commerce fs-7">
                                  Quantity
                                </th>
                                <th className="titles-commerce fs-7">
                                  Subtotal
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product) => (
                                <tr key={product.id}>
                                  <td>
                                    <div
                                      style={{
                                        backgroundImage: `url(${product.image})`,
                                        backgroundPosition: `center`,
                                        backgroundSize: `cover`,
                                        minWidth: `4rem`,
                                        minHeight: `3rem`,
                                      }}
                                    ></div>
                                  </td>
                                  <td className="fs-7">{product.name}</td>
                                  <td className="fs-7">U$S {product.price}</td>
                                  <td className="fs-7">
                                    {product.order_product.quantity}
                                  </td>
                                  <td className="fs-7">
                                    U$S{" "}
                                    {Number(product.order_product.quantity) *
                                      Number(product.price)}
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <th
                                  colSpan="4"
                                  className="text-end titles-commerce fs-7"
                                >
                                  Taxes (19%)
                                </th>
                                <td className="fs-7">
                                  U$S{" "}
                                  {order.products
                                    .map(
                                      (item) =>
                                        Number(item.price) *
                                        Number(item.order_product.quantity)
                                    )
                                    .reduce(
                                      (prevValue, currentValue) =>
                                        Number(prevValue) + Number(currentValue)
                                    ) * 0.19}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  colSpan="4"
                                  className="text-end titles-commerce fs-7"
                                >
                                  Total Before Taxes
                                </th>
                                <td className="fs-7">
                                  U$S{" "}
                                  {order.products
                                    .map(
                                      (item) =>
                                        Number(item.price) *
                                        Number(item.order_product.quantity)
                                    )
                                    .reduce(
                                      (prevValue, currentValue) =>
                                        Number(prevValue) + Number(currentValue)
                                    ) -
                                    order.products
                                      .map(
                                        (item) =>
                                          Number(item.price) *
                                          Number(item.order_product.quantity)
                                      )
                                      .reduce(
                                        (prevValue, currentValue) =>
                                          Number(prevValue) +
                                          Number(currentValue)
                                      ) *
                                      0.19}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  colSpan="4"
                                  className="text-end titles-commerce fs-7"
                                >
                                  Total After Taxes
                                </th>
                                <td className="fs-7">
                                  U$S{" "}
                                  {order.products
                                    .map(
                                      (item) =>
                                        Number(item.price) *
                                        Number(item.order_product.quantity)
                                    )
                                    .reduce(
                                      (prevValue, currentValue) =>
                                        Number(prevValue) + Number(currentValue)
                                    )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Loader color="#000" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
          <Loader color="#000" />
        </div>
      )}
    </>
  );
};

export default Main;
