import { autHeader } from "./../../helpers/authHeader";
import axios from "axios";
import qs from "qs";
import { request } from "https";

export const userService = {
  login
};

const url = `http://192.168.10.180:8090`;

function login(username, password, grant_type) {
  //console.log(`voy por este lado =>`, username, password, grant_type);
  const data = {
    username,
    password,
    grant_type
  };
  // const data = {
  //   username,
  //   password,
  //   grant_type
  // };
  // for (var key in data) {
  //   formData.append(key, data[key]);
  //   console.log(formData);
  // }
  //const data = `username=${username}&password=${password}6&grant_type=&{grant_type}`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + window.btoa("frontendapp:12345")
    },
    data: qs.stringify({ username, password, grant_type }),
    url: "http://192.168.10.180:8090/api/security/oauth/token"
  };

  return axios(requestOptions)
    .then(response => response.json())
    .then(user => {
      console.log(user);
      //localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}
