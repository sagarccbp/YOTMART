import React, { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { API_SERVER, API_KEY } from "home/ApiService";
export const address = new BehaviorSubject(null);

export const login = (mobileNumber, password, myCallback) => {
  fetch(`${API_SERVER}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobileNumber,
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      if (Number.isInteger(data)) {
        myCallback(data);
        return data;
      } else {
        if (data && data.user) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        myCallback(data);
        return data;
      }
    })
    .catch((error) => {
      return error;
    });
};

export const create = (fullName, email, mobileNumber, password, myCallback) => {
  fetch(`${API_SERVER}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName,
      email,
      mobileNumber,
      password,
      role: "CUSTOMER",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      myCallback(data);
      return data.access_token;
    })
    .catch((error) => {
      myCallback(error);
      return error;
    });
};

export function useLoggedIn() {
  const [user, setUserCred] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setUserCred(user);
  }, []);
  return user;
}

export const getUserAddress = (userId, userToken) => {
  fetch(`${API_SERVER}/address/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      console.log(data);
      address.next(data);
    })

    .catch((error) => {
      console.log(error);
    });
};

export const createNewAddress = (state, checked, userToken) => {
  const body = {
    name: state.name,
    contactNumber: state.contactNumber,
    city: state.city,
    pin: state.pin,
    area: state.area,
    district: state.district,
    state: state.state,
    userId: state.userId,
    houseNumber: state.houseNumber,
    isDefaultAddress: state.isDefaultAddress,
    landMark: state.landMark,
    alternativeMobileNumber: state.alternativeMobileNumber,
    addressType: checked,
  };

  fetch(`${API_SERVER}/address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      getUserAddress(state.userId, userToken);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAddress = (addressId, userId, userToken) => {
  fetch(`${API_SERVER}/address/${addressId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      console.log(data, "DELETE ADDRESS");
      getUserAddress(userId, userToken);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editAddress = (addressId, isDefaultAddress, userId, userToken) => {
  fetch(`${API_SERVER}/address/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify({
      isDefaultAddress: isDefaultAddress,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      getUserAddress(userId, userToken);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editEntireAddress = (
  addressId,
  userId,
  state,
  checked,
  userToken
) => {
  console.log();
  const body = {
    name: state.name,
    contactNumber: state.contactNumber,
    city: state.city,
    pin: state.pin,
    area: state.area,
    district: state.district,
    state: state.state,
    userId: state.userId,
    houseNumber: state.houseNumber,
    isDefaultAddress: state.isDefaultAddress,
    landMark: state.landMark,
    alternativeMobileNumber: state.alternativeMobileNumber,
    addressType: checked,
  };

  fetch(`${API_SERVER}/address/${addressId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      getUserAddress(userId, userToken);
    })
    .catch((error) => {
      console.log(error);
    });
};

function generateOrderReciept() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

export const createRazorPayOrder = (
  cartResult,
  userToken,
  callBackFunction
) => {
  const body = {
    amount: cartResult.totalPrice * 10,
    reciept: generateOrderReciept(),
    userId: cartResult.userId,
  };
  fetch(`${API_SERVER}/payOnline/createOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      callBackFunction(data);
      console.log("Razor pay order id is ", data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const verifyOrder = (
  razorPayOrderId,
  razorPayPaymentId,
  signature,
  razorPayModelId,
  callBack
) => {
  const body = {
    razorPayOrderId: razorPayOrderId,
    razorPayPaymentId: razorPayPaymentId,
    signature: signature,
    razorPayModelId: razorPayModelId,
  };
  fetch(`${API_SERVER}/verifyOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      callBack(data);
    })
    .catch((error) => {
      callBack(error);
    });
};

export function generateRandomID(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomID = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters.charAt(randomIndex);
  }
  return randomID;
}

// Pass here all customer details here..
export const createOrderForOwner = (body, userToken, callBack) => {
  fetch(`${API_SERVER}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      console.log("DATAAA", data);
      callBack(data);
    })
    .catch((error) => {
      callBack(error);
    });
};

export const getOrders = (userId, userToken, callBackFunction) => {
  console.log("INSIDE GET ORDERS", userId, userToken);
  fetch(`${API_SERVER}/orders/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      if (Number.isInteger(data)) {
        callBackFunction(data);
        return data;
      } else {
        callBackFunction(data);
        return data;
      }
    })
    .catch((err) => {
      callBackFunction(err);
      console.log(err);
      return err;
    });
};

export const writeReview = (
  itemId,
  heading,
  description,
  rating,
  user,
  userToken
) => {
  fetch(`${API_SERVER}/review/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify({
      heading,
      description,
      rating,
      user,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      console.log(data, "REVIEW");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const makePhonePe = (
  cartTotal,
  cartId,
  addressId,
  userToken,
  callBack
) => {
  let body = { amount: cartTotal, cart: cartId, address: addressId };
  fetch(`${API_SERVER}/phonePay/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      console.log("DATAAA", data);
      callBack(data);
    })
    .catch((error) => {
      callBack(error);
    });
};

export const forgotPassword = (email, myCallback) => {
  fetch(`${API_SERVER}/user/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      if (Number.isInteger(data)) {
        myCallback(data);
        return data;
      } else {
        myCallback(data);
        return data;
      }
    })
    .catch((error) => {
      return error;
    });
};

export const resetPassword = (id, token, password, myCallback) => {
  fetch(`${API_SERVER}/user/reset-password/${id}/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      if (Number.isInteger(data)) {
        myCallback(data);
        return data;
      } else {
        myCallback(data);
        return data;
      }
    })
    .catch((error) => {
      return error;
    });
};
