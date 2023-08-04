import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import MobileMenu from "./MobileMenu";
import "./Navbar.css";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { useUserAuth } from "../../hooks/userHook";

const Nav = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) return setIsScrolling(true);
      return setIsScrolling(false);
    });
  }, []);
  return (
    <nav
      className={`navbar-nav d-flex flex-row py-3 fixed-top ${
        isScrolling && `bg-white border-bottom`
      } ${location.pathname === "/" ? `` : `bg-white border-bottom`}`}
    >
      {children}
    </nav>
  );
};

const AdminButton = () => {
  const { user } = useUserAuth();
  return (
    <>
      {user && user.role === "ADMIN" && (
        <Link
          to="/admin"
          type="button"
          className="btn btn-outline-dark border border-dark rounded-0 py-0 d-flex flex-row align-items-center"
          title="Admin"
        >
          <span className="titles-commerce fs-7">Admin</span>
        </Link>
      )}
    </>
  );
};

const ShoppingCartButton = () => {
  const shoppingCart = useSelector((state) => state.shoppingCartReducer);

  return (
    <button
      type="button"
      className={`btn d-flex align-items-center position-relative py-2 fs-5 text-dark`}
      data-bs-toggle="offcanvas"
      data-bs-target="#shoppingCart"
      aria-controls="shoppingCart"
    >
      <span className="position-absolute top-0 start-80 translate-middle badge rounded-pill bg-danger fs-7">
        {shoppingCart.length <= 0
          ? 0
          : shoppingCart
              .map((product) => product.quantity)
              .reduce(
                (prevQuantity, currentQuantity) =>
                  Number(prevQuantity) + Number(currentQuantity)
              )}
        <span className="visually-hidden">Shopping Cart</span>
      </span>
      <i className="far fa-shopping-bag"></i>
    </button>
  );
};

const LoginButton = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {!user ? (
        <button
          type="button"
          className="d-flex align-items-center btn bg-transparent fs-4 titles-commerce"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          title="Login"
        >
          <i className="far fa-sign-in-alt"></i>
        </button>
      ) : user.token ? (
        <Link
          to="/user"
          className="d-flex align-items-center btn bg-transparent fs-4 titles-commerce"
        >
          <i className="fad fa-user-circle"></i>
        </Link>
      ) : (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
};

const CheckIfDashboard = ({ children }) => {
  const location = useLocation();
  return <>{!location.pathname.includes("/admin") && <>{children}</>}</>;
};

class Navbar extends React.Component {
  static Item = ({ to, icon, children }) => {
    return (
      <Link
        to={to}
        className={`d-flex flex-row align-items-center text-decoration-none py-2 text-dark nav-links`}
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title={children}
        tabIndex="0"
      >
        <span className={`fs-5 me-2`}>{icon}</span>
        <span className="">{children}</span>
      </Link>
    );
  };
  render() {
    return (
      <CheckIfDashboard>
        <Modal />
        <Nav>
          <div className="d-flex flex-column container px-3">
            <div className="d-flex flex-row">
              <div className="d-flex d-lg-none align-items-center">
                <button
                  type="button"
                  className={`btn d-flex align-items-center py-2 fs-5 text-dark`}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#mobileMenu"
                  aria-controls="mobileMenu"
                >
                  <i className="far fa-bars"></i>
                </button>
                <MobileMenu>{this.props.children}</MobileMenu>
              </div>
              <Link
                to="/"
                className={`d-flex align-items-center justify-content-center flex-grow-1 flex-lg-grow-0 fs-5 logo-commerce fw-bolder text-dark text-decoration-none`}
              >
                X-AUTOS
              </Link>
              <div className="d-none d-lg-flex flex-grow-1 align-items-center justify-content-center non-responsive">
                {this.props.children}
              </div>
              <AdminButton />
              <LoginButton />
              <div className="d-flex align-items-center">
                <ShoppingCartButton />
                <ShoppingCart />
              </div>
            </div>
          </div>
        </Nav>
      </CheckIfDashboard>
    );
  }
}

export default Navbar;
