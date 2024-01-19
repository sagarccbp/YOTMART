import { API_SERVER, API_KEY } from "home/ApiService";
const adminId = "63ac2283b689ca32bc25c249";

export const initiateChat = (userId, userToken, callBackFunction) => {
  const body = {
    userId: userId,
    withUserId: adminId,
  };
  fetch(`${API_SERVER}/chat`, {
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
    })
    .catch((error) => {
      console.log(error);
    });
};

export const messagesList = (chatId, callBackFunction) => {
  fetch(`${API_SERVER}/message/${chatId}`, {
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

export const sendMessage = (
  chatId,
  userId,
  content,
  userToken,
  callBackFunction
) => {
  const body = {
    sender: userId,
    chatId: chatId,
    content: content,
  };
  fetch(`${API_SERVER}/message`, {
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
