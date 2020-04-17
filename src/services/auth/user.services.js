import { autHeader } from "./../../helpers/authHeader";
import axios from "axios";
import qs from "qs";

export const userService = {
  login,
  logout
};

//const url = `http://192.168.10.180:8090`;
// const url = `http://192.168.0.19:8090`;
const url = `http://181.57.182.193:8090`;

function login(username, password, grant_type) {
  //console.log(`voy por este lado =>`, username, password, grant_type);
  const data = {
    username,
    password,
    grant_type
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + window.btoa("frontendapp:12345")
    },
    data: qs.stringify({ username, password, grant_type }),
    url: `${url}/api/security/oauth/token`
  };

  return axios(requestOptions)
    .then()
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("auth_token");
  window.location.replace("/");
}

function handleResponse(response) {
  return response.json().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        console.log("por este lado services ", response);
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
