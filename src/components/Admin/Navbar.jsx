import "./Admin.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [collapse, setCollapse] = useState(false);
  // eslint-disable-next-line
  const handleNavBar = () => setCollapse((prev) => !prev);

  return (
    <nav className="position-sticky">
      {!collapse && (
        <ul
          style={{
            minWidth: "15Rem",
            maxWidth: "18Rem",
            zIndex: "110",
          }}
          className="vh-100 text-dark list-group rounded-0 bg-dark-t1 adminTransitionLeftNavbar"
        >
          <li className="list-group-item text-center p-2 bg-dark-t1 text-white w-100 my-2 fs-5 my-3">
            <i className="fas fa-fire mx-2"></i>X-AUTOS
          </li>
          <li className="list-group-item px-4">
            <Link
              to="/admin"
              className=" btn text-dark w-100 border-0 adminContract text-start"
            >
              <i className="mx-2 fa fa-home"></i>
              Dashboard
            </Link>
          </li>
          <li className="list-group-item px-4">
            <Link
              to="/admin/products"
              className=" btn text-dark w-100 border-0 adminContract text-start"
            >
              <i className="mx-2 fa fa-boxes"></i>
              Products
            </Link>
          </li>
          <li className="list-group-item px-4">
            <Link
              to="/admin/orders"
              className=" btn text-dark w-100 border-0 adminContract text-start"
            >
              <i className="mx-2 fas fa-list-alt"></i>
              Orders
            </Link>
          </li>
          <li className="list-group-item px-4">
            <Link
              to="/admin/users"
              className=" btn text-dark w-100 border-0 adminContract text-start"
            >
              <i className="mx-2 fa fa-users"></i>
              Users
            </Link>
          </li>
          <li className="list-group-item px-4">
            <Link
              to="/admin/brands"
              className=" btn text-dark w-100 border-0 adminContract text-start"
            >
              <i className="mx-2 fas fa-copyright"></i>
              Brands
            </Link>
          </li>
          <li className="list-group-item px-4">
            <Link
              to="/admin/settings"
              className=" btn text-dark w-100 border-0 adminContract text-start"
            >
              <i className="mx-2 fas fa-cog"></i>
              Settings
            </Link>
          </li>
          {/* <li className="list-group-item p-0 bg-dark-t1 ms-auto">
             <button
              type="button"
              title="Close left menu"
              className=" btn text-white adminContract m-2"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleNavBar}
            >
              <i className="text-danger fas fa-arrow-left fs-5 mx-2"></i>
              <span style={{ position: "relative", top: "-.2Rem" }}>
                Close Menu
              </span>
            </button> 
          </li> */}
          <li>
            <a
              href="/"
              type="button"
              className="btn btn-outline-danger border-0 rounded-0 text-white fs-5"
              title="home"
            >
              <i className="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
      )}
      {/*
      <div
        style={{ height: "2.5rem", position: "fixed" }}
        className="bg-dark-t1 adminTransitionBottomNavbar vw-100"
      >
        <button
          type="button"
          title="Close left menu"
          className=" btn text-white adminContract p-1 m-1"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setCollapse((prev) => !prev)}
        >
          <span style={{ position: "relative", top: "-.2Rem" }}>Open Menu</span>
          <i className="text-success fas fa-arrow-right fs-5 mx-2"></i>
        </button>
      </div>*/}
    </nav>
  );
}

export default Navbar;
