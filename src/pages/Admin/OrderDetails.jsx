import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  useEffect(() => {
    const getOrders = () => {
      axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/orders/" + id,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          setOrder(response.data);
        })
        .catch((error) => {});
    };
    getOrders();
  }, [order, user, id]);

  return order ? (
    <div className="d-flex flex-column p-4 w-100">
      <div className="d-flex flex-row w-100 align-items-center justify-content-between">
        <Link to={`/admin/orders`} className="me-3">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <span className="d-flex titles-commerce fw-bold fs-4 w-100">
          Order #{order.id}
        </span>
      </div>
      <div className="d-flex flex-column w-100 align-items-center p-4 bg-white shadow my-3">
        <span className="d-flex titles-commerce fw-bold fs-6 w-100 border-bottom border-dark pb-2 mb-3">
          Customer Information
        </span>
        <table className="table table-responsive align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.user.id}</td>
              <td>{order.user.firstname}</td>
              <td>{order.user.lastname}</td>
              <td>{order.user.email}</td>
            </tr>
            <tr className="border-bottom border-dark">
              <th colSpan="2">Phone</th>
              <th colSpan="2">Address</th>
            </tr>
            <tr>
              <td colSpan="2">{order.user.telephone}</td>
              <td colSpan="2">{order.user.address}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-column w-100 align-items-center p-4 bg-white shadow">
        <span className="d-flex titles-commerce fw-bold fs-6 w-100 border-bottom border-dark pb-2 mb-3">
          Order Details
        </span>
        <table className="table table-responsive align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order.id}</td>

              <td>
                {order.status === "PENDING" ? (
                  <span className="bg-warning rounded px-2 fw-bold fs-7">
                    PENDING
                  </span>
                ) : order.status === "COMPLETED" ? (
                  <span className="bg-success rounded px-2 fw-bold fs-7 text-white">
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
              </td>
              <td>{order.paymentMethod}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{formatDate(order.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column w-100 align-items-center p-4 bg-white shadow">
        <span className="d-flex titles-commerce fw-bold fs-6 w-100 border-bottom border-dark pb-2 mb-3">
          Order Summary
        </span>
        <table className="table table-responsive align-middle">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
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
                <td>{product.name}</td>
                <td>U$S {product.price}</td>
                <td>{product.order_product.quantity}</td>
                <td>
                  U$S{" "}
                  {Number(product.order_product.quantity) *
                    Number(product.price)}
                </td>
              </tr>
            ))}
            <tr>
              <th colSpan="5" className="text-end titles-commerce">
                Taxes (19%)
              </th>
              <td>
                U$S{" "}
                {order.products
                  .map(
                    (item) =>
                      Number(item.price) * Number(item.order_product.quantity)
                  )
                  .reduce(
                    (prevValue, currentValue) =>
                      Number(prevValue) + Number(currentValue)
                  ) * 0.19}
              </td>
            </tr>
            <tr>
              <th colSpan="5" className="text-end titles-commerce">
                Total Before Taxes
              </th>
              <td>
                U$S{" "}
                {order.products
                  .map(
                    (item) =>
                      Number(item.price) * Number(item.order_product.quantity)
                  )
                  .reduce(
                    (prevValue, currentValue) =>
                      Number(prevValue) + Number(currentValue)
                  ) -
                  order.products
                    .map(
                      (item) =>
                        Number(item.price) * Number(item.order_product.quantity)
                    )
                    .reduce(
                      (prevValue, currentValue) =>
                        Number(prevValue) + Number(currentValue)
                    ) *
                    0.19}
              </td>
            </tr>
            <tr>
              <th colSpan="5" className="text-end titles-commerce">
                Total After Taxes
              </th>
              <td>
                U$S{" "}
                {order.products
                  .map(
                    (item) =>
                      Number(item.price) * Number(item.order_product.quantity)
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
  ) : (
    <div>Loading</div>
  );
};

export default OrderDetails;
