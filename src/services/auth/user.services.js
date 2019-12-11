import { autHeader } from "./../../helpers/authHeader";
import axios from "axios";

export const userService = {
  login
};

const url = `http://192.168.10.180:8090`;

function login(username, password, grant_type) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("grant_type", grant_type);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + window.btoa("frontendapp:12345")
    },
    body: formData
  };

  console.log("por este lado el serive", formData);

  return fetch(`${url}/api/security/oauth/token`, requestOptions)
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
