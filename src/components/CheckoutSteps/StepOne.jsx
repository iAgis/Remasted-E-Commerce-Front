import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useUserAuth } from "../../hooks/userHook";
import Loader from "../Loader/Loader";
// import axios from "axios";

const StepOne = ({ step, setStep, formData, setFormData }) => {
  const userSession = useSelector((state) => state.user);
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setStep((prev) => prev + 1);
    setLoading(false);
  }
  return (
    <>
      {userSession ? (
        <>
          {user ? (
            <form
              className="d-flex flex-column mt-3"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  name="firstname"
                  placeholder="Firstname"
                  required
                  disabled
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      firstname: `${e.target.value}`,
                    }))
                  }
                />
                <label htmlFor="firstname" className="">
                  Firstname
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  name="lastname"
                  placeholder="Lastname"
                  required
                  disabled
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      lastname: `${e.target.value}`,
                    }))
                  }
                />
                <label htmlFor="lastname">Lastname</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  required
                  disabled
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      email: `${e.target.value}`,
                    }));
                  }}
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  placeholder="Phone number"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      phone: `${e.target.value}`,
                    }))
                  }
                />
                <label htmlFor="phone">Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Shipping Address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      address: `${e.target.value}`,
                    }))
                  }
                />
                <label htmlFor="phone">Shipping Adresss</label>
              </div>
              <button
                type="submit"
                className="btn btn-dark titles-commerce rounded-0"
                disabled={loading}
              >
                {loading ? "Loading..." : "Next Step"}
              </button>
            </form>
          ) : (
            <div
              className="w-100 d-flex align-items-center justify-content-center"
              style={{ height: `20vh` }}
            >
              <Loader color="#000" />
            </div>
          )}
        </>
      ) : (
        <div className="d-flex align-items-center flex-lg-row">
          Please log in to continue the checkout.
          <button
            className="btn btn-outline-dark mx-2 rounded-0"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            title="Login"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};

export default StepOne;
