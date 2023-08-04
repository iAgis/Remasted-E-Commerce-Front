import React, { useState, useEffect } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useUserAuth } from "../../hooks/userHook";

const CheckoutSteps = ({ shoppingCart }) => {
  const [step, setStep] = useState(1);
  const { user } = useUserAuth();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "mercadopago",
  });
  useEffect(() => {
    if (user)
      setFormData((prev) => ({
        ...prev,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        phone: user.telephone,
      }));
  }, [user]);
  return (
    <div className="border shadow rounded-0 p-3">
      {step === 1 ? (
        <>
          <h5 className="titles-commerce mb-3">Step One - Information</h5>
          <StepOne
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      ) : step === 2 ? (
        <>
          <h5 className="titles-commerce mb-3">Step Two - Payment Method</h5>
          <StepTwo
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      ) : (
        <>
          <h5 className="titles-commerce mb-3">Step Three - Overview</h5>
          <StepThree
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            shoppingCart={shoppingCart}
          />
        </>
      )}
    </div>
  );
};

export default CheckoutSteps;
