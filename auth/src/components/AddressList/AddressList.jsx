import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { MdDelete, MdEditNote } from "react-icons/md";
import {
  address,
  useLoggedIn,
  getUserAddress,
  deleteAddress,
  editAddress,
  editEntireAddress,
} from "auth/ApiService";
import "./addresslist.scss";

const AddressList = ({ getAddress }) => {
  const user = useLoggedIn();

  const [loggedInUser, setLoggedInUser] = useState({});
  const [userAddress, setUserAddress] = useState({});
  const [selectedRadioButton, setSelectedRadioButton] = useState();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState("");

  const isChecked = (value) => value === checked;

  const onSelect = ({ target: { value } }) => {
    console.log(value, "RADIO");
    setChecked(value);
  };

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setLoggedInUser(user);
  }, [user]);

  useEffect(() => {
    if (Object.keys(loggedInUser).length > 0) {
      getUserAddress(loggedInUser.user._id, loggedInUser.token);
    }
  }, [loggedInUser, address]);

  useEffect(() => {
    address.subscribe((value) => {
      if (value) {
        setUserAddress(value);
        const defaultAddress = value.address.filter(
          (address) => address.isDefaultAddress === true
        );
        if (defaultAddress.length > 0) {
          setSelectedAddress(defaultAddress[0]);
        }
      }
    });
  }, []);

  useEffect(() => {
    getAddress(selectedAddress);
  }, [selectedAddress]);

  const onOptionChange = (e) => {
    const addressId = e;
    const selectAddress = userAddress.address.filter(
      (address) => address._id === e.target.value
    );
    console.log(selectAddress, "SELECY");
    setSelectedAddress(selectAddress);

    editAddress(
      e.target.value,
      true,
      loggedInUser.user._id,
      loggedInUser.token
    );
  };

  function changeHandler(evt) {
    const value = evt.target.value;

    if (evt.target.name === "contactNumber" || evt.target.pin === "pin") {
      setSelectedAddress({
        ...selectedAddress,
        [evt.target.name]: parseInt(value),
      });
    } else {
      setSelectedAddress({
        ...selectedAddress,
        [evt.target.name]: value,
      });
    }
  }

  const updateAddress = (event) => {
    event.preventDefault();
    editEntireAddress(
      selectedAddress._id,
      selectedAddress.userId,
      selectedAddress,
      checked,
      loggedInUser.token
    );
    setModal(!modal);
  };

  return (
    <div>
      <div className="address-list-container">
        <div className="address-list-heading">DELIVERY ADDRESS</div>
        <div className="address-list">
          {userAddress &&
          userAddress.address &&
          userAddress.address.length > 0 ? (
            userAddress.address.map((address, index) => {
              console.log(address, "ADDDDD");
              return (
                <div className="address-container" key={index}>
                  <input
                    type="radio"
                    name="selectedRadioButton"
                    value={address._id}
                    checked={
                      selectedRadioButton === address._id ||
                      address.isDefaultAddress
                    }
                    onChange={onOptionChange}
                    style={{ height: "22px" }}
                  />
                  <div className="address-edit-container">
                    <div className="address">
                      <p className="name-contact">
                        <span className="address-type">
                          {address.addressType}
                        </span>{" "}
                        {address.name} {address.contactNumber},{" "}
                        {address.alternativeMobileNumber}
                      </p>
                      <p className="address-details">
                        {address.area}, {address.landMark}, {address.city},{" "}
                        {address.district}, {address.state} -{" "}
                        <span className="pincode">{address.pin}</span>
                      </p>
                      {/* <button
                        className="deliver-here-button"
                        style={
                          selectedRadioButton === address._id ||
                          address.isDefaultAddress
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        DELIVER HERE
                      </button> */}
                    </div>
                    <div
                      className="delete-edit-container"
                      style={
                        selectedRadioButton === address._id ||
                        address.isDefaultAddress
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      <MdDelete
                        size={22}
                        style={{ marginRight: "30px", cursor: "pointer" }}
                        onClick={() => {
                          deleteAddress(
                            address._id,
                            address.userId,
                            loggedInUser.token
                          );
                        }}
                      />
                      <MdEditNote
                        size={28}
                        style={{ cursor: "pointer" }}
                        onClick={toggle}
                      />
                      <div>
                        <Modal isOpen={modal} toggle={toggle}>
                          <ModalHeader toggle={toggle}>
                            Edit Address Here
                          </ModalHeader>
                          <ModalBody>
                            <form onSubmit={(event) => updateAddress(event)}>
                              <div className="new-address">
                                <div className="two-input-fields">
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={selectedAddress.name}
                                    onChange={changeHandler}
                                    className="address-input-filed"
                                  />
                                  <input
                                    type="number"
                                    pattern="[0-9]*"
                                    placeholder="Mobile Number"
                                    className="address-input-filed"
                                    name="contactNumber"
                                    value={selectedAddress.contactNumber}
                                    onChange={changeHandler}
                                  />
                                </div>
                                <div className="two-input-fields">
                                  <input
                                    type="number"
                                    pattern="[0-9]*"
                                    placeholder="Pincode"
                                    className="address-input-filed"
                                    name="pin"
                                    value={selectedAddress.pin}
                                    onChange={changeHandler}
                                  />
                                  <input
                                    type="text"
                                    placeholder="City"
                                    className="address-input-filed"
                                    name="city"
                                    value={selectedAddress.city}
                                    onChange={changeHandler}
                                  />
                                </div>
                                <textarea
                                  type="textarea"
                                  rows="2"
                                  placeholder="Address (Area and Street)"
                                  className="address-input-filed-textarea"
                                  name="area"
                                  value={selectedAddress.area}
                                  onChange={changeHandler}
                                />
                                <div className="two-input-fields">
                                  <input
                                    type="text"
                                    placeholder="District"
                                    className="address-input-filed"
                                    name="district"
                                    value={selectedAddress.district}
                                    onChange={changeHandler}
                                  />
                                  <input
                                    type="text"
                                    placeholder="State"
                                    className="address-input-filed"
                                    name="state"
                                    value={selectedAddress.state}
                                    onChange={changeHandler}
                                  />
                                </div>
                                <div className="two-input-fields">
                                  <input
                                    type="text"
                                    name="landMark"
                                    placeholder="Landmark"
                                    className="address-input-filed"
                                    value={selectedAddress.landMark}
                                    onChange={changeHandler}
                                  />
                                  <input
                                    type="tel"
                                    name="alternativeMobileNumber"
                                    placeholder="Alternate Phone"
                                    className="address-input-filed"
                                    value={
                                      selectedAddress.alternativeMobileNumber
                                    }
                                    onChange={changeHandler}
                                  />
                                </div>
                                <p className="address-type-text">
                                  Address Type
                                </p>
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
                                    <label>
                                      Office (Delivery between 10 AM - 5 PM)
                                    </label>
                                  </div>
                                </div>
                                <div className="save-cancel">
                                  <button
                                    type="submit"
                                    className="save-deliver-button"
                                  >
                                    UPDATE
                                  </button>
                                </div>
                              </div>
                            </form>
                          </ModalBody>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-address-container">No Saved Address Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressList;
