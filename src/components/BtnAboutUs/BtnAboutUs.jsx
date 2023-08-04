import React from "react";
import { Link } from "react-router-dom";

const BtnAboutUs = () => {
  return (
    <Link
      to="/about"
      className="btn btn-primary rounded-0 titles-commerce fw-bold px-4"
      style={{
        zIndex: 1000,
        position: `fixed`,
        top: 0,
        right: 0,
        marginRight: `1rem`,
        marginTop: `5rem`,
      }}
    >
      About us
    </Link>
  );
};

export default BtnAboutUs;
