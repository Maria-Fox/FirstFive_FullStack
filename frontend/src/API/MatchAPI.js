import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class MatchAPI {

  // Used to authenticate user. Sent in request header.
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


  // ******************************************* Match methods

  static async addMatch(username, project_id) {
    let res = await this.request(`matches/${username}/${project_id}`, {}, 'post');
    return res;
  };

  static async viewUserMatches(username) {
    let res = await this.request(`matches/${username}/all`);
    return res;
  };

  static async removeUserMatch(username, project_id) {
    let res = await this.request(`matches/${username}/${project_id}`, {}, 'delete');
    return res;
  };

  static async viewProjectUserMatches(project_id) {
    let res = await this.request(`matches/${project_id}/users`);
    return res;
  };


};

export default MatchAPI;