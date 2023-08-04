import React from "react";

const MobileMenu = ({children}) => {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="mobileMenu"
      aria-labelledby="mobileMenuLabel"
    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title titles-commerce fs-6 fw-bold"
          id="mobileMenuLabel"
        >
          X-AUTOS
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="d-flex flex-column offcanvas-body position-relative bg-white">
        <div className="overflow-scroll flex-grow-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
