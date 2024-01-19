import React, { useState, useRef } from "react";
import { createNewAddress } from "../../rest/ApiService";
import "./createnewaddress.scss";

const Address = () => {
  const myForm = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState("");

  const initialState = {
    isDefaultAddress: false,
    houseNumber: Number,
    userId: user.user._id,
    name: "",
    contactNumber: "",
    pin: Number,
    city: "",
    area: "",
    district: "",
    state: "",
    alternativeMobileNumber: Number,
    landMark: "",
  };
  const [state, setState] = useState(initialState);

  const isChecked = (value) => value === checked;

  const onSelect = ({ target: { value } }) => {
    console.log(value, "RADIO");
    setChecked(value);
  };

  function changeHandler(evt) {
    const value = evt.target.value;
    console.log(state, "ADDRESS");
    if (evt.target.name === "contactNumber" || evt.target.pin === "pin") {
      setState({
        ...state,
        [evt.target.name]: parseInt(value),
      });
    } else {
      setState({
        ...state,
        [evt.target.name]: value,
      });
    }
  }

  const addNewAddress = (event) => {
    event.preventDefault();
    createNewAddress(state, checked, user.token);
    setState(initialState);
  };

  return (
    <div className="create-new-address-container">
      <div
        className="add-new-address-heading"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        ADD A NEW ADDRESS
      </div>
      <form
        id="form"
        ref={myForm}
        onSubmit={addNewAddress}
        className="new-address-container"
        style={isOpen ? { display: "flex" } : { display: "none" }}
      >
        <div className="new-address">
          <h3 className="new-address-heading">Add a new address here</h3>
          <div className="two-input-fields">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={state.name}
              className="address-input-filed"
              onChange={changeHandler}
            />
            <input
              type="number"
              pattern="[0-9]*"
              placeholder="Mobile Number"
              required
              className="address-input-filed"
              name="contactNumber"
              value={state.contactNumber}
              onChange={changeHandler}
            />
          </div>
          <div className="two-input-fields">
            <input
              type="number"
              pattern="[0-9]*"
              placeholder="Pincode"
              required
              className="address-input-filed"
              name="pin"
              value={state.pin}
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="City"
              required
              className="address-input-filed"
              name="city"
              value={state.city}
              onChange={changeHandler}
            />
          </div>
          <textarea
            type="textarea"
            rows="2"
            placeholder="Address (Area and Street)"
            className="address-input-filed-textarea"
            name="area"
            value={state.area}
            onChange={changeHandler}
          />
          <div className="two-input-fields">
            <input
              type="text"
              placeholder="District"
              className="address-input-filed"
              required
              name="district"
              value={state.district}
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="State"
              className="address-input-filed"
              name="state"
              value={state.state}
              onChange={changeHandler}
            />
          </div>
          <div className="two-input-fields">
            <input
              type="text"
              name="landMark"
              value={state.landMark}
              onChange={changeHandler}
              placeholder="Landmark"
              className="address-input-filed"
            />
            <input
              type="tel"
              name="alternativeMobileNumber"
              value={state.alternativeMobileNumber}
              onChange={changeHandler}
              placeholder="Alternate Phone"
              className="address-input-filed"
            />
          </div>
          <p className="address-type-text">Address Type</p>
          <div className="address-type-container">
            <div className="home-work">
              <input
                type="radio"
                className="new-address-radio-button"
                name="HOME"
                value="HOME"
                checked={isChecked("HOME")}
                onChange={onSelect}
              />
              <label>Home (All day delivery)</label>
            </div>
            <div className="home-work">
              <input
                type="radio"
                className="new-address-radio-button"
                name="OFFICE"
                value="OFFICE"
                checked={isChecked("OFFICE")}
                onChange={onSelect}
              />
              <label>Office (Delivery between 10 AM - 5 PM)</label>
            </div>
          </div>
          <div className="save-cancel">
            <button type="submit" className="save-deliver-button">
              SAVE
            </button>
            <button
              type="button"
              className="new-address-cancel-button"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Address;
