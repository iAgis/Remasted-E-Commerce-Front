import React from "react";
import { useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { useDispatch } from "react-redux";

function closeModal() {
  const backdrop = document.getElementsByClassName("modal-backdrop");
  const modalTarget = document.getElementById("exampleModal");
  modalTarget.classList.remove("show");
  modalTarget.style = "";
  document.body.classList.remove("modal-open");
  document.body.style = "";
  backdrop[0].remove();
}

const ErrorMsg = ({ error }) => {
  return (
    <>
      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

const LoginForm = ({ loading, setLoading, error, setError }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function loginUser(ev) {
    setLoading(true);
    ev.preventDefault();
    axios({
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN}/users/token`,
      data: { email, password },
    })
      .then((response) => {
        dispatch({
          type: "LOGIN_USER",
          payload: response.data,
        });
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        setError("Something went wrong.");
        setLoading(false);
      });
  }
  return (
    <>
      <form action="" onSubmit={(ev) => loginUser(ev)}>
        <ErrorMsg error={error} />
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control rounded-0"
            id="floatingInput"
            placeholder="name@example.com"
            disabled={loading}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control rounded-0"
            id="floatingPassword"
            disabled={loading}
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button
          className="btn btn-dark mt-2 w-100 titles-commerce rounded-0"
          disabled={loading}
        >
          {loading ? "Loading" : "Log In"}
        </button>
      </form>

      <ul className="list-group my-1 py-2 rounded-0">
        <li className="list-group-item fw-bold d-flex align-items-center titles-commerce fs-7">
          Admin test account
          <button
            className="ms-auto btn btn-danger rounded-0 titles-commerce p-2"
            onClick={() => {
              setEmail("admin@uy.com");
              setPassword("root");
            }}
          >
            Get It
          </button>
        </li>
        <li className="list-group-item fw-bold d-flex align-items-center titles-commerce fs-7">
          User test account
          <button
            className="ms-auto btn btn-danger rounded-0 titles-commerce p-2"
            onClick={() => {
              setEmail("user@uy.com");
              setPassword("root");
            }}
          >
            Get It
          </button>
        </li>
      </ul>
    </>
  );
};

const SignupForm = ({ loading, setLoading, error, setError }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function getToken() {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN}/users/token`,
      data: { email, password },
    })
      .then((response) => {
        dispatch({
          type: "LOGIN_USER",
          payload: response.data,
        });
        setLoading(false);
        closeModal();
      })
      .catch((error) => {
        setError("Something went wrong.");
        setLoading(false);
      });
  }

  function registerUser(ev) {
    ev.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN}/users/`,
      data: { firstname, lastname, address, telephone, email, password },
    })
      .then((response) => {
        getToken();
      })
      .catch((error) => {
        if (error.response.data) {
          setError(error.response.data.error);
        } else {
          setError("Try later");
        }
        setLoading(false);
      });
  }

  return (
    <form action="" onSubmit={(ev) => registerUser(ev)}>
      <ErrorMsg error={error} />
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control rounded-0"
          id="firstname"
          value={firstname}
          placeholder="First Name"
          disabled={loading}
          onChange={(ev) => setFirstname(ev.target.value)}
        />
        <label htmlFor="firstName">First Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control rounded-0"
          id="lastName"
          value={lastname}
          disabled={loading}
          placeholder="Last Name"
          onChange={(ev) => setLastname(ev.target.value)}
        />
        <label htmlFor="lastName">Last name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control rounded-0"
          id="email"
          value={email}
          disabled={loading}
          placeholder="name@example.com"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control rounded-0"
          id="address"
          value={address}
          disabled={loading}
          placeholder="Address"
          onChange={(ev) => setAddress(ev.target.value)}
        />
        <label htmlFor="address">Address </label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="number"
          className="form-control rounded-0"
          id="phoneNumber"
          value={telephone}
          disabled={loading}
          placeholder="Phone Number"
          onChange={(ev) => setTelephone(ev.target.value)}
        />
        <label htmlFor="phoneNumber">Phone Number</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control rounded-0"
          id="password"
          value={password}
          disabled={loading}
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label htmlFor="password">Password</label>
      </div>
      <button
        className="btn btn-dark mt-2 w-100 titles-commerce rounded-0"
        disabled={loading}
      >
        {loading ? "Loading" : "Register"}
      </button>
    </form>
  );
};
const Modal = () => {
  const [modalChange, setModalChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title titles-commerce">
              {modalChange ? "Register" : "Log In"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {modalChange ? (
              <SignupForm
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            ) : (
              <LoginForm
                loading={loading}
                setLoading={setLoading}
                error={error}
                setError={setError}
              />
            )}
            <button
              className="btn btn-outline-dark w-100 mt-2 titles-commerce rounded-0"
              onClick={() => setModalChange((prev) => !prev)}
              disabled={loading}
            >
              {loading ? "Loading" : modalChange ? "Log In" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
