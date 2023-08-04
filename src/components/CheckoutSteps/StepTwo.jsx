import React from "react";
import mercadoPagoImg from "../../images/logos/mercadoPago.png";

const StepTwo = ({ step, setStep, formData, setFormData }) => {
  return (
    <>
      <div className="form-check d-flex flex-row align-items-center border border-dark p-4 mb-3">
        <input
          className="form-check-input me-2 ms-0"
          type="radio"
          name="paymentMethod"
          value="paypal"
          id="paypal"
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              paymentMethod: `${e.target.value}`,
            }))
          }
          defaultChecked={formData.paymentMethod === "paypal" ? true : false}
        />
        <label className="form-check-label" htmlFor="paypal">
          <img
            src="https://logodownload.org/wp-content/uploads/2014/10/paypal-logo-4.png"
            alt="PayPal"
            style={{ width: `9rem` }}
          />
        </label>
      </div>
      <div className="form-check d-flex flex-row align-items-center border border-dark p-4">
        <input
          className="form-check-input me-2 ms-0"
          type="radio"
          name="paymentMethod"
          id="mercadopago"
          value="mercadopago"
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              paymentMethod: `${e.target.value}`,
            }))
          }
          defaultChecked={
            formData.paymentMethod === "mercadopago" ? true : false
          }
        />
        <label className="form-check-label" htmlFor="mercadopago">
          <img
            src={mercadoPagoImg}
            alt="MercadoPago"
            style={{ width: `9rem` }}
          />
        </label>
      </div>
      <button
        className="btn btn-dark titles-commerce rounded-0 w-100 mt-3"
        onClick={() => setStep((prev) => prev + 1)}
      >
        Next Step
      </button>
      <button
        className="btn bg-white text-dark border border-dark titles-commerce rounded-0 w-100"
        onClick={() => setStep((prev) => prev - 1)}
      >
        Go back
      </button>
    </>
  );
};

export default StepTwo;
