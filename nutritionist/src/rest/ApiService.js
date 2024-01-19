import { API_SERVER, API_KEY } from "home/ApiService";

export const getDiseases = (callBackFunction) => {
  fetch(`${API_SERVER}/nutritionist/disease`, {
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

export const getForms = (callBackFunction) => {
  fetch(`${API_SERVER}/nutritionist/form`, {
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

export const submitSingleForm = (
  disease,
  form,
  questionAnswers,
  userToken,
  callBackFunction
) => {
  const body = {
    disease: disease,
    forms: {
      formId: form._id,
      formName: form.name,
      answers: questionAnswers,
    },
  };
  console.log(body, "form");

  fetch(`${API_SERVER}/nutritionist/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: userToken,
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      callBackFunction(response);
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    })
    .then((data) => {
      console.log(data);
      // callBackFunction(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getFormsWithDisease = (diseaseId, callBackFunction) => {
  fetch(`${API_SERVER}/nutritionist/form-with-diease/${diseaseId}`, {
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

export const getDietPlanItems = (userToken, callBackFunction) => {
  fetch(`${API_SERVER}/nutritionist/customer/diate`, {
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
      console.log(err);
      return err;
    });
};
