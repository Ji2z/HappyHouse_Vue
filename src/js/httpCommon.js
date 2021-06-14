import axios from "axios";

export default {
  default: axios.create({
    baseURL: "http://localhost:9999/happyhouse/rest/",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  qna: axios.create({
    baseURL: "http://localhost:9999/happyhouse/rest/qna/",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  user: axios.create({
    baseURL: "http://localhost:9999/happyhouse/rest/user/",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  deal: axios.create({
    baseURL: "http://localhost:9999/happyhouse/rest/deal/",
    headers: {
      "Content-Type": "application/json",
    },
  }),
};
