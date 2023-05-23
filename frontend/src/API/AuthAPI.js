import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class AuthAPI {

  // Used to authenticate user
  static token = "";

  // ******************************************* API send request method

  static async request(endpoint, data = {}, method = "get") {

    if (!this.token) {
      this.token = window.localStorage.getItem("token") || "invalidTemp"
    };

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${API.token}` };
    const params = (method === "get")
      ? data
      : {};


    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.message);
      // grab just the error message
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    };
  };


  // ******************************************* Register/ LOGIN methods


  static async registerUser(userData) {
    let newUser = await this.request("auth/register", { ...userData }, 'post');
    this.token = newUser.signedJWT
    return newUser.signedJWT;
  };

  static async authenticateUser(userData) {
    let authUser = await this.request(`auth/login`, { ...userData }, 'post');
    return authUser.signedJWT;
  };

};

export default AuthAPI;