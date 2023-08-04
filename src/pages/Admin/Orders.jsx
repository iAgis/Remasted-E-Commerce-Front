import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../components/Admin/Admin.css";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";

function Orders() {
  const [orders, setOrders] = useState(null);
  const [fetching, setFetching] = useState(true);
  const user = useSelector((state) => state.user);
  const [strToFilter, setStrToFilter] = useState("");

  useEffect(() => {
    setOrders(null);
    const getOrders = () => {
      axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/orders",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          setOrders(response.data);
          setFetching(false);
        })
        .catch((error) => {
          setFetching(false);
        });
    };
    getOrders();
  }, [fetching, user]);

  function handleStatusChange(e, orderId) {
    e.preventDefault();
    setFetching(true);
    axios({
      method: "patch",
      url: process.env.REACT_APP_DOMAIN + "/orders",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user.token}`,
      },
      data: { id: orderId, status: e.target.value },
    })
      .then((response) => {
        setFetching(false);
      })
      .catch((error) => {
        setFetching(false);
      });
  }
  /*function handleOrderDelete(orderId) {
    setFetching(true);
    axios({
      method: "delete",
      url: process.env.REACT_APP_DOMAIN + "/orders",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${user.token}`,
      },
      data: { id: orderId },
    })
      .then((response) => {
        setFetching(false);
      })
      .catch((error) => {
        setFetching(false);
      });
  }*/
  return orders ? (
    <div className="d-flex flex-column p-4 w-100">
      <div className="d-flex flex-row w-100 align-items-center justify-content-between">
        <span className="d-flex titles-commerce fw-bold fs-4">Orders</span>
        <button
          className="btn btn-outline-primary rounded-0"
          onClick={() => setFetching(true)}
        >
          <i className="fas fa-sync"></i>
        </button>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control mt-4"
          placeholder="Search orders by id or customer e-mail..."
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          value={strToFilter}
          onChange={(ev) => setStrToFilter(ev.target.value)}
        />
      </div>
      <div className="w-100">
        <table className="table table-responsive align-middle">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Created At</th>
              <th colSpan="2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((item) => filterOrder(item, strToFilter))
              .map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/admin/orders/${order.id}`}>{order.id}</Link>
                  </td>
                  <td>{order.user.email}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <select
                      defaultValue={order.status}
                      onChange={(e) => handleStatusChange(e, order.id)}
                      className="form-control"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                      <option value="PAID">PAID</option>
                    </select>
                  </td>
                  <td className="text-center">
                    {/* <button
                    className="btn btn-outline-danger rounded-0 p-0 px-2"
                    onClick={() => handleOrderDelete(order.id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </button> */}
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="btn btn-outline-primary rounded-0 p-0 px-2 ms-3"
                    >
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{ height: `100vh` }}
    >
      <Loader color="#000" />
    </div>
  );
}

export default Orders;

function filterOrder(order, strToFilter) {
  if (strToFilter === "") {
    return true;
  } else {
    let res = false;
    const keyWord = strToFilter.toLowerCase();
    res = order.id === Number(strToFilter);
    if (!res) res = order.user.email.toLowerCase().includes(keyWord);
    if (!res) res = formatDate(order.createdAt).toLowerCase().includes(keyWord);
    if (!res) res = order.status.toLowerCase().includes(keyWord);
    return res;
  }
}
