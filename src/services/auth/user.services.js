import { autHeader } from "./../../helpers/authHeader";
import axios from "axios";

export const userService = {
  login
};

const url = `http://192.168.10.180:8090`;

function login(username, password, grant_type) {
  const data = {
    username,
    password,
    grant_type
  };
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("grant_type", data.grant_type);

  //   for (const x in data) {
  //     formData.append(x, data[x]);
  //   }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: formData
  };

  console.log(formData);

  return axios
    .post(`${url}/api/security/oauth/token`, requestOptions)
    .then(response => response.json)
    .then(user => {
      //ver que trajo
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}
