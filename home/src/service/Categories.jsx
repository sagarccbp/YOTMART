import { BehaviorSubject } from "rxjs";

export const API_SERVER = "http://localhost:9000"; //Local

// export const API_SERVER = "https://api.yotmart.in"; //Server

// export const API_KEY = "KLjpao45Mww8Awnjnwi7/RRYnq5XuankdqVUbfDvW/o="; //Local
// export const API_KEY = "iz+HfU8a+QV3a0EKRHQ5RtdJ8soqMoHw6NoEm19RBTI="; //Server
// export const API_KEY = "tX3R0d5Sg/IJVvE9XoAhAepg0qvF0jISgzre1234wJI="; //Server
// export const API_KEY = "Doc4r6jfFWgbAIE+PKdF+GtP60jMgL5m6VxMCCNfrwg=";
export const API_KEY = "Ntohc6LqZMiAVa7w5Kzp1aRbPCEGqPaG2ICTcV6h1Vk=";
export const menus = new BehaviorSubject(null);

export const menuItems = (callBackFunction) => {
  fetch(`${API_SERVER}/menuItems`, {
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
        if (data && data.user) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        callBackFunction(data);
        return data;
      }
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export async function fetchMenuItems() {
  fetch(`${API_SERVER}/menuItems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      api_key: API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

// export function useMenuList() {
//     const [menuList, setMenuList] = useState(menus);

//     useEffect(() => {
//         setMenuList(menus);
//         return menus.subscribe((c)=> {
//             setMenuList(menus.value);
//         });
//     }, []);
//     return menuList;
// }

export const getCategories = (callBackFunction) => {
  fetch(`${API_SERVER}/categories`, {
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

export const getSearchData = (search, dropDownSelect, callBackFunction) => {
  fetch(`${API_SERVER}/filter?q=${search}&category=${dropDownSelect}`, {
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

export const getBanners = (callBackFunction) => {
  fetch(`${API_SERVER}/homeScreenItems/banners`, {
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

export const getHomeScreenItems = (callBackFunction) => {
  fetch(`${API_SERVER}/homeScreenItems/homeScreenItems`, {
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

export const getTrendingCollection = (callBackFunction) => {
  fetch(`${API_SERVER}/homeScreenItems/trendingCollections`, {
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

export const getStaticElements = (callBackFunction) => {
  fetch(`${API_SERVER}/homeScreenItems/staticElements`, {
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

export const getAllHomeScreenItems = (callBackFunction) => {
  fetch(`${API_SERVER}/homeScreenItems`, {
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
