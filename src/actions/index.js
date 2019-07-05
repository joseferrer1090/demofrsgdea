import axios from "axios";
import httpConglomerado from "./../services/conglomerado/httpConglomerado";

const getData = () => {
  return axios.get(httpConglomerado.url);
};
