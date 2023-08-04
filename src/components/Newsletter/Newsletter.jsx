import React from "react";

const Newsletter = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: `30vh`, backgroundColor: `#f0f0f0` }}
    >
      <div className="titles-commerce fw-bolder fs-3">Keep in touch</div>
      <div className="titles-commerce fw-lighter fs-6">
        Subscribe to our Newsletter
      </div>
      <div className="d-flex flex-column flex-lg-row mt-3">
        <input
          type="text"
          name="newsletter"
          id="newsletter"
          className="bg-white rounded-0 border border-dark px-2"
          placeholder="email@email.com"
        />
        <button className="btn btn-dark rounded-0 titles-commerce">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
