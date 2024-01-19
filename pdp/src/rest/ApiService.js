import { API_SERVER, API_KEY } from "home/ApiService";

export const subCategoriesOfCategory = (id, callBackFunction) => {
  fetch(`${API_SERVER}/items?subCatId=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      api_key: API_KEY,
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
      console.log(err);
      return err;
    });
};

export const getItemDetails = (itemId, callBackFunction) => {
  fetch(`${API_SERVER}/items/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      api_key: API_KEY,
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
      callBackFunction(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
