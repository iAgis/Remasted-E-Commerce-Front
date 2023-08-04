import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

const CheckIfDashboard = ({ children }) => {
  const location = useLocation();
  return <>{!location.pathname.includes("/admin") && <>{children}</>}</>;
};

const Footer = () => {
  return (
    <CheckIfDashboard>
      <footer className="footerClass bg-dark">
        <div className="container p-0 py-5">
          <div className="row p-2">
            <div className="col-md-6 my-3">
              <h6 className="footerTitle titles-commerce">About</h6>
              <p className="fw-lighter text-white">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                laboriosam voluptatibus, reprehenderit explicabo fuga aspernatur
                reiciendis nam corrupti? Aspernatur voluptatum voluptatibus odio
                officia officiis ad? Sunt quis inventore nobis molestias?
              </p>
            </div>

            <div className="col-md-2 my-3">
              <h6 className="footerTitle titles-commerce">Contact</h6>
              <ul className="footerContent footerUl">
                <li>Montevideo - UY </li>
                <li>Street Tomas Diago 659</li>
                <li>contact@x-autos.com</li>
                <li>(+598) 2903 0733</li>
              </ul>
            </div>
            <div className="col-md-2 my-3">
              <h6 className="footerTitle titles-commerce">Follow us</h6>
              <ul className="footerContent footerUl fs-6">
                <li>
                  <a href="/">
                    <i className="fab fa-instagram me-2"></i>
                  </a>
                  <a href="/">
                    <i className="fab fa-facebook me-2"> </i>
                  </a>
                  <a href="/">
                    <i className="fab fa-twitter me-2"> </i>
                  </a>
                  <a href="/">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </CheckIfDashboard>
  );
};

export default Footer;
