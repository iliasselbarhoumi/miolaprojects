import axios from "axios";

const API_URL = "http://localhost:9090/authenticate";

const register = (username, password) => {
  return axios.post("http://localhost:9090/register", {
    username,
    password,
    role:"user"
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL , {
      username,
      password,
    })
    .then((response) => {
      if (response.data.jwttoken) {
        localStorage.setItem("user", JSON.stringify(response));
        console.log("llocal storage "+localStorage.getItem("user"));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
