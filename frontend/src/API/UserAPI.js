import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class UserAPI {

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


  // ******************************************* USER methods

  static async viewUser(username) {
    let res = await this.request(`users/${username}`);
    return res.userData;
  };

  static async viewAuthUserProfile(username) {
    let res = await this.request(`users/${username}/profile`);
    return res.userData;
  };

  static async editUser(username, updateData) {
    let res = await this.request(`users/${username}`, { ...updateData }, 'patch');
    return res.userData;
  };

  static async deleteUser(username) {
    let res = await this.request(`users/${username}`, {}, 'delete');
    return res;
  };

};


export default UserAPI;