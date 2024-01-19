import { API_SERVER, API_KEY } from "home/ApiService";

export const subCategoriesOfCategory = (id, callBackFunction) => {
  fetch(`${API_SERVER}/categories/subcategories?categoryId=${id}`, {
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

export const categoryDetails = (id, callBackFunction) => {
  fetch(`${API_SERVER}/categories/${id}`, {
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

export const itemsOfSubCategory = (id, callBackFunction) => {
  fetch(`${API_SERVER}/sub_categories/items/?subCatId=${id}`, {
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
    });
};

export const getFiltersDataOfShopByPrice = (
  checked,
  fromPrice,
  toPrice,

  callBackFunction
) => {
  let query = "";

  query = checked;

  if (fromPrice) {
    query = query + "&" + "priceFrom=" + fromPrice;
    console.log(query, "FROM");
  }
  if (toPrice) {
    query = query + "&" + "priceTo=" + toPrice;
    console.log(query, "TO");
  }

  fetch(`${API_SERVER}/filter/shopByPrice?instock=${query}`, {
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

export const getFiltersData = (
  checked,
  fromPrice,
  toPrice,
  subCatId,
  callBackFunction
) => {
  let query = "";

  query = checked;

  if (fromPrice) {
    query = query + "&" + "priceFrom=" + fromPrice;
    console.log(query, "FROM");
  }
  if (toPrice) {
    query = query + "&" + "priceTo=" + toPrice;
    console.log(query, "TO");
  }

  fetch(
    `${API_SERVER}/filter/filterWithQuery?instock=${query}&subCatId=${subCatId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
      },
    }
  )
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

export const getFilterByPriceData = (price, callBackFunction) => {
  console.log(price, "PRICE");
  fetch(`${API_SERVER}/filter/${price}`, {
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
