import React from "react";
import { useDispatch } from "react-redux";

const Item = ({ id, name, price, image, quantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="shadow d-flex flex-column p-3 mb-3">
      <div className="d-flex flex-row w-100">
        <img src={image} alt={name} className="img-fluid" style={{width: "8rem", height: "5rem"}} />
        <div className="ms-0 ms-md-3 mb-3 mb-md-0 d-flex flex-column flex-grow-1">
          <span className="d-flex flex-column">
            <span className="titles-commerce fw-bold fs-6">{name}</span>
            <hr />
            <span className="fs-7">SKU {id}</span>
            <span className="fw-bold">U$S {price}</span>
            <span className="fs-7 mb-3">Quantity: {quantity}</span>
          </span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row align-items-center justify-content-start border border-dark p-2 fs-7">
          <button
            className="btn btn-dark py-0 px-2 rounded-0"
            disabled={quantity <= 1 ? true : false}
            onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: id })}
          >
            -
          </button>
          <span className="px-3">{quantity}</span>
          <button
            className="btn btn-dark py-0 px-2 rounded-0"
            onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: id })}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-outline-dark py-0 px-2 rounded-0"
          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: id })}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Item;
