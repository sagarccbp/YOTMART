import { BehaviorSubject } from "rxjs";
import { API_SERVER } from "home/ApiService";

export const cart = new BehaviorSubject(null);
export const kitCartItems = async (
  data,
  userId,
  userToken,
  callBackFunction
) => {
  console.log(data, "DATA");
  console.log(userId, "USERID");
  console.log(userToken, "TOKEN");
  if (data) {
    const result = await Promise.allSettled(
      data.diatePlan.map(async (item) => {
        const response = await fetch(`${API_SERVER}/cart/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: userToken,
          },
          body: JSON.stringify({
            itemId: item.ingredient._id,
            quantity: item.quantity,
            varientId: item.varient,
          }),
        });

        return await response.json();
      })
    );
    if (result) {
      callBackFunction(result);
      getCartItems(userId, userToken);
    }
    console.log("result", result);
  }
};

export const cartItems = (
  itemId,
  userId,
  variantId,
  quantity,
  userToken,
  callBackFunction
) => {
  fetch(`${API_SERVER}/cart/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify({
      itemId: itemId,
      quantity: quantity,
      varientId: variantId,
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
      callBackFunction(data);
      getCartItems(userId, userToken);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCartItems = (userId, userToken) => {
  fetch(`${API_SERVER}/cart/${userId}`, {
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
      cart.next(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPhonePeCartItems = (userId, userToken, callBackFunction) => {
  console.log(userId, userToken);
  fetch(`${API_SERVER}/cart/${userId}`, {
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
      callBackFunction(data);
      console.log("SAGA");
      console.log(data);
      cart.next(data);
    })
    .catch((error) => {
      callBackFunction(error);
      console.log("SAGA");
      console.log(error);
    });
};
export const updateCartItemQuantity = (
  userId,
  itemId,
  variantId,
  type,
  userToken
) => {
  fetch(`${API_SERVER}/cart/updateQuantity/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify({
      itemId: itemId,
      varient: variantId,
      type: type,
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
      getCartItems(userId, userToken);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCartItem = (userId, itemId, varient, userToken) => {
  fetch(`${API_SERVER}/cart/clearItem/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify({
      itemId,
      varient,
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
      console.log(data);
      getCartItems(userId, userToken);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const clearCart = (cartId, userToken, userId) => {
  fetch(`${API_SERVER}/cart/${cartId}`, {
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
      console.log(data);
      getCartItems(userId, userToken);
    })
    .catch((error) => {
      console.log(error);
    });
};
