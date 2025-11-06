// StripeWrapper.js
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"); // Ta clé publique ici

const StripeWrapper = ({ children }) => {
    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeWrapper;
