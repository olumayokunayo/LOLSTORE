import React, { useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import Card from "../../component/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../component/checkoutSummary/CheckoutSummary";
const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};
const CheckoutDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout");
  };
  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>CheckoutDetails</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Addresss</h3>
              <label>Recipient name:</label>
              <input
                type="text"
                placeholder="Recipient name"
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label>Address Line 1:</label>
              <input
                type="text"
                placeholder="Address Line 1"
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label>Address Line 2:</label>
              <input
                type="text"
                placeholder="Address Line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>City:</label>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label>State:</label>
              <input
                type="text"
                placeholder="State"
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
                required
              />
              <label>Postal Code:</label>
              <input
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
                required
              />
              <CountryDropdown
                valueType="short"
                value={shippingAddress.country}
                className={styles.select}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Phone:</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
                required
              />
            </Card>

            {/* billing address */}

            <Card cardClass={styles.card}>
              <h3>Billing Addresss</h3>
              <label>Name:</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label>Address Line 1:</label>
              <input
                type="text"
                placeholder="Address Line 1"
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label>Address Line 2:</label>
              <input
                type="text"
                placeholder="Address Line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label>City:</label>
              <input
                type="text"
                placeholder="City"
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label>State:</label>
              <input
                type="text"
                placeholder="State"
                name="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
                required
              />
              <label>Postal Code:</label>
              <input
                type="text"
                placeholder="Postal Code"
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
                required
              />
              <CountryDropdown
                valueType="short"
                value={billingAddress.country}
                className={styles.select}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Phone:</label>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
                required
              />

              <button type="submit" className="--btn --btn-primary">
                Proceed To Checkout
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
