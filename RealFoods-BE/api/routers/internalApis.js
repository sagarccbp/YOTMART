let fetch = require("node-fetch");
const makeOrder = async (
  selectedPaymentMode,
  cartResult,
  userId,
  addressId,
  userToken
) => {
  console.log(cartResult);

  const items = cartResult.items;
  const itemArr = [];

  for (let i = 0; i < items.length; i++) {
    let item = {
      _id: items[i]._id,
      varient: items[i].varient,
      quantity: items[i].itemQuantity,
    };
    itemArr.push(item);
  }

  const body = {
    customer: userId,
    address: addressId,
    items: itemArr,
    paymentMode: selectedPaymentMode,
    payableAmount: selectedPaymentMode === "CASH" ? cartResult.totalPrice : 0,
    orderAmount: cartResult.totalPrice,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify(body),
  };
  const generateOrder = await fetch(
    `${process.env.REALFOODS_API}/orders`,
    options
  );
  const generateOrderResponse = await generateOrder.json();
  console.log(generateOrderResponse, "ORDERRESPONSE");
  if (generateOrderResponse) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: userToken,
      },
    };
    const clearCart = await fetch(
      `${process.env.REALFOODS_API}/cart/${cartResult._id}`,
      options
    );
    const clearCartResponse = await clearCart.json();
    console.log(clearCartResponse, "CARTCLEAR");
  }
};

module.exports = { makeOrder };
