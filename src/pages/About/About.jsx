import React from "react";
import contributors from "../../images/contributors";
import mysqlImg from "../../images/logos/mysql.png";
import aboutImgs from "../../images/about";

function About() {
  return (
    <>
      <div className="container my-5 pt-5">
        <div className="titles-commerce fw-bold fs-3 mx-auto text-center mb-3">
          About X-AUTOS Project
        </div>
        <div className="w-100 d-flex flex-row align-items-center justify-content-center py-3 border-bottom border-dark">
          <a
            href="#overview"
            className="btn btn-outline-dark rounded-0 border-0 titles-commerce fs-7"
          >
            Overview
          </a>
          <a
            href="#stack"
            className="btn btn-outline-dark rounded-0 border-0 titles-commerce fs-7"
          >
            Stack
          </a>
          <a
            href="#team"
            className="btn btn-outline-dark rounded-0 border-0 titles-commerce fs-7"
          >
            Team {"&"} Contact
          </a>
        </div>
      </div>
      {/* LANDING-PAGE */}
      <div className="container">
        <div id="overview" className="row g-5 mt-2 align-items-center">
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column">
              <div className="titles-commerce fs-3 fw-bold mb-2">
                Landing Page
              </div>
              <div className="titles-commerce fs-7">
                Easy and fast to configure, fetching products set up as featured
                showing only three of them.
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img
              src={aboutImgs.a}
              alt="landing-x-autos"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
      {/* LANDING-PAGE-END */}
      {/* PRODUCT-PAGE */}
      <div style={{ backgroundColor: `rgb(220, 220, 220)` }}>
        <div className="container py-5 mt-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-md-6">
              <img
                src={aboutImgs.b}
                alt="products-x-autos"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column">
                <div className="titles-commerce fs-3 fw-bold mb-2">
                  Products Page
                </div>
                <div className="titles-commerce fs-7">
                  Modern and minimalist concept, easy to understand showing only
                  selected categories of brands.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PRODUCT-PAGE-END */}
      {/* PRODUCT-VIEW */}
      <div className="container py-5 mt-5">
        <div className="row g-5 align-items-center">
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column">
              <div className="titles-commerce fs-3 fw-bold mb-2">
                Product View
              </div>
              <div className="titles-commerce fs-7">
                Thought-out for e-commerce, easy buying the product.
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img
              src={aboutImgs.c}
              alt="landing-x-autos"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
      {/* PRODUCT-VIEW-END */}
      {/* USER-PAGE */}
      <div style={{ backgroundColor: `rgb(220, 220, 220)` }}>
        <div className="container py-5 mt-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-md-6">
              <img
                src={aboutImgs.d}
                alt="landing-x-autos"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column">
                <div className="titles-commerce fs-3 fw-bold mb-2">
                  User Page
                </div>
                <div className="titles-commerce fs-7">
                  He can see him data and purchases, with every detail.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* USER-PAGE-END */}
      {/* ADMIN-PRODUCTS */}
      <div>
        <div className="container py-5 mt-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column">
                <div className="titles-commerce fs-3 fw-bold mb-2">
                  Dashboard
                </div>
                <div className="titles-commerce fs-7">
                  Go to Login in this page and login how Admin, to see
                  Dashboard. Try add a product, remove users.
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <img
                src={aboutImgs.i}
                alt="landing-x-autos"
                className="img-fluid rounded shadow mx-auto d-block"
              />
            </div>
          </div>
        </div>
      </div>
      {/* ADMIN-PRODUCTS-END */}
      {/* SHOPPING-CART */}
      <div style={{ backgroundColor: `rgb(220, 220, 220)` }}>
        <div className="container py-5 mt-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-md-6">
              <img
                src={aboutImgs.e}
                alt="landing-x-autos"
                className="img-fluid rounded shadow mx-auto d-block"
              />
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column">
                <div className="titles-commerce fs-3 fw-bold mb-2">
                  Shopping Cart
                </div>
                <div className="titles-commerce fs-7">
                  This style to keep user buying products and easy buying.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* SHOPPING-CART-END */}
      {/* CHECKOUT */}
      <div className="py-3">
        <div className="container py-5 mt-5">
          <div className="titles-commerce fs-3 fw-bold text-center">
            Checkout steps
          </div>
          <div className="row g-5 mt-2 align-items-center">
            <div className="col-12 col-md-4">
              <img
                src={aboutImgs.g}
                alt="landing-x-autos"
                className="img-fluid rounded shadow mx-auto d-block"
              />
              <div className="d-flex flex-column mt-5">
                <div className="titles-commerce fs-4 fw-bold mb-2">
                  Step One
                </div>
                <div className="titles-commerce fs-7">
                  Login to can buy, view an resume of user and shopping cart.
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <img
                src={aboutImgs.ga}
                alt="landing-x-autos"
                className="img-fluid rounded shadow mx-auto d-block"
              />
              <div className="d-flex flex-column mt-5">
                <div className="titles-commerce fs-4 fw-bold mb-2">
                  Step Two
                </div>
                <div className="titles-commerce fs-7">
                  Select every method of buy, and maintenance same style to fast
                  buy.
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <img
                src={aboutImgs.gb}
                alt="landing-x-autos"
                className="img-fluid rounded shadow mx-auto d-block"
              />
              <div className="d-flex flex-column mt-5">
                <div className="titles-commerce fs-4 fw-bold mb-2">
                  Step Three
                </div>
                <div className="titles-commerce fs-7">
                  Verify all data, and is step to get the order
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CHECKOUT-END */}
      {/* BUY A CAR */}
      <div style={{ backgroundColor: `rgb(220, 220, 220)` }}>
        <div className="container py-5 mt-5">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column">
                <div className="titles-commerce fs-3 fw-bold mb-2">UI / UX</div>
                <div className="titles-commerce fs-7">
                  Soft and modern methods to buy a car.
                  <br /> All in one place.
                  <br /> Easy use.
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <img
                src={aboutImgs.h}
                alt="landing-x-autos"
                className="img-fluid rounded shadow mx-auto d-block"
              />
            </div>
          </div>
        </div>
      </div>
      {/* BUY A CAR-END */}
      {/* STACK */}
      <div
        style={{
          marginBottom: "-3rem",
        }}
      >
        <div className="container py-5 mt-5">
          <div
            id="stack"
            className="titles-commerce fw-bold fs-3 mx-auto text-center mt-3"
          >
            Stack
          </div>
          <div className="titles-commerce mx-auto text-center mt-2">
            We build the future in hand of latest technologies.
          </div>
          <div className="d-flex flex-row flex-wrap align-items-center justify-content-center mt-2 mb-5">
            <img
              src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png"
              alt="React-Logo"
              title="React"
              className="img-fluid m-3"
              style={{ width: "15%", filter: "grayscale(100%)" }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Redux_Logo.png/1200px-Redux_Logo.png"
              alt="Redux"
              title="Redux"
              className="img-fluid m-3"
              style={{ width: "15%", filter: "grayscale(100%)" }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1280px-Node.js_logo_2015.svg.png"
              alt="NodeJS"
              title="NodeJS"
              className="img-fluid m-3"
              style={{ width: "15%", filter: "grayscale(100%)" }}
            />
            <img
              src="https://cdn.buttercms.com/2q5r816LTo2uE9j7Ntic"
              alt="ExpressJS"
              title="ExpressJS"
              className="img-fluid m-3"
              style={{ width: "15%", filter: "grayscale(100%)" }}
            />
            <img
              src={mysqlImg}
              alt="MySQL"
              title="MySQL"
              className="img-fluid m-3"
              style={{ width: "9%", filter: "grayscale(100%)" }}
            />
            <img
              src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/205146/logo-light.png"
              alt="Supabase"
              title="Supabase"
              className="img-fluid m-3"
              style={{ width: "15%", filter: "grayscale(100%)" }}
            />
          </div>
        </div>
      </div>
      {/* STACK-END */}
      {/* TEAM */}
      <div className="bg-dark" id="team">
        <div className="container py-5 my-5">
          <div className="d-flex flex-column mt-5">
            <div className="titles-commerce text-white fs-3 fw-bold text-center">
              Meet the Team
            </div>
            <div className="titles-commerce text-white text-center mt-2">
              Building amazing websites with passion.
            </div>
          </div>
          <div className="row g-5 mb-5 mt-1">
            <div className="col-12 col-md-4">
              <div className="d-flex flex-column py-5 bg-white">
                <div
                  className="rounded-circle d-block mx-auto"
                  style={{
                    width: `10rem`,
                    height: `10rem`,
                    backgroundImage: `url(${contributors.tomasSanchez})`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                    filter: `grayscale(100)`,
                  }}
                />
                <div className="titles-commerce text-center fs-4 fw-bold mt-3">
                  Tomás Sánchez
                </div>
                <div className="titles-commerce text-center">
                  Fullstack Developer
                </div>
                <div className="d-flex flex-row align-items-center justify-content-evenly w-100 fs-4 mt-auto">
                  <a
                    href="https://tomas-sanchez.dev"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="far fa-globe"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tom%C3%A1s-s%C3%A1nchez-7381241b6//"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/F56/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex flex-column py-5 bg-white h-100">
                <div
                  className="rounded-circle d-block mx-auto"
                  style={{
                    width: `10rem`,
                    height: `10rem`,
                    backgroundImage: `url(${contributors.eliseoImperial})`,
                    backgroundColor: `rgb(210, 210, 210)`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                    filter: `grayscale(100)`,
                    backgroundPositionX: `1rem`,
                    backgroundPositionY: `-3rem`,
                  }}
                />
                <div className="titles-commerce text-center fs-4 fw-bold mt-3">
                  Eliseo Imperial
                </div>
                <div className="titles-commerce text-center mt-2">
                  Fullstack Developer
                </div>
                <div className="d-flex flex-row align-items-center justify-content-evenly w-100 fs-4 mt-auto">
                  <a href="https://" target="_blank" rel="noreferrer">
                    <i className="far fa-globe"></i>
                  </a>
                  <a href="https://" target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/EliseoImperial"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="d-flex flex-column py-5 bg-white h-100">
                <div
                  className="rounded-circle d-block mx-auto"
                  style={{
                    width: `10rem`,
                    height: `10rem`,
                    backgroundImage: `url(${contributors.agustinLemes})`,
                    backgroundColor: `rgb(210, 210, 210)`,
                    backgroundPosition: `center`,
                    backgroundSize: `cover`,
                    filter: `grayscale(100)`,
                  }}
                />
                <div className="titles-commerce text-center fs-4 fw-bold mt-3">
                  Agustín Lemes
                </div>
                <div className="titles-commerce text-center mt-2">
                  Fullstack Developer
                </div>
                <div className="d-flex flex-row align-items-center justify-content-evenly w-100 fs-4 mt-auto">
                  <a
                    href="https://agus.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="far fa-globe"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/iagis/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/iAgis"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* TEAM-END */}
      {/* CONTACT */}
      <div
        id="contact"
        className="container py-5 my-5 text-center titles-commerce fs-4 fw-bold"
      >
        Thanks for your Time!
      </div>
      {/* CONTACT-END */}
    </>
  );
}

export default About;
