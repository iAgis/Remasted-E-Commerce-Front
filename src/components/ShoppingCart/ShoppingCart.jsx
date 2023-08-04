import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Item from "./Item";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.shoppingCartReducer);
  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="shoppingCart"
      aria-labelledby="shoppingCartLabel"

    >
      <div className="offcanvas-header">
        <h5
          className="offcanvas-title titles-commerce fs-6 fw-bold"
          id="shoppingCartLabel"
        >
          Shopping Cart
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="d-flex flex-column offcanvas-body position-relative bg-white">
        <div className="overflow-auto flex-grow-1">
          {shoppingCart.map((item, index) => (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="bg-white">
          <Link
            to="/checkout"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            className="btn w-100 bg-dark text-white border-0 rounded-0 titles-commerce fs-7 fw-bold"
          >
            Checkout
          </Link>
          <button
            onClick={() => dispatch({ type: "EMPTY_CART" })}
            className="btn w-100 bg-outlined-primary border-dark rounded-0 titles-commerce fs-7 fw-bold mt-2"
          >
            Empty cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
