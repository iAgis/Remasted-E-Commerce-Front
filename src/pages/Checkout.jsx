import React from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps";
import Lonely from "../components/CheckoutSteps/Lonely";
import Item from "../components/ShoppingCart/Item";

const Checkout = () => {
  const shoppingCart = useSelector((state) => state.shoppingCartReducer);

  return shoppingCart.length >= 1 ? (
    <div className="container my-5 pt-5">
      <h3 className="d-block w-100 fw-bold titles-commerce mb-3">Checkout</h3>
      <div className="bg-white d-flex flex-column-reverse flex-md-row">
        <div className="d-flex flex-column flex-grow-1">
          <CheckoutSteps shoppingCart={shoppingCart} />
        </div>
        <div className="d-flex flex-column ms-0 ms-md-3 mb-3 mb-md-0 border border-dark rounded-0 shadow p-4">
          <h5 className="titles-commerce">RESUMEN</h5>
          <div className="d-flex flex-column flex-grow-1">
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
          <div className="d-flex flex-column border-top border-dark pt-3">
            <span className="fs-7" style={{ textTransform: `uppercase` }}>
              Taxes (19%): U$S{" "}
              {shoppingCart
                .map((item) => item.price * item.quantity)
                .reduce(
                  (prevValue, currentValue) =>
                    Number(prevValue) + Number(currentValue)
                ) * 0.19}
            </span>
            <span className="mb-3 fs-7" style={{ textTransform: `uppercase` }}>
              Subtotal: U$S{" "}
              {shoppingCart
                .map((item) => item.price * item.quantity)
                .reduce(
                  (prevValue, currentValue) =>
                    Number(prevValue) + Number(currentValue)
                ) -
                shoppingCart
                  .map((item) => item.price * item.quantity)
                  .reduce(
                    (prevValue, currentValue) =>
                      Number(prevValue) + Number(currentValue)
                  ) *
                  0.19}
            </span>
            <span className="p-2 bg-dark text-white titles-commerce fw-bolder">
              Total: U$S{" "}
              {shoppingCart
                .map((item) => item.price * item.quantity)
                .reduce(
                  (prevValue, currentValue) =>
                    Number(prevValue) + Number(currentValue)
                )}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Lonely />
  );
};

export default Checkout;
