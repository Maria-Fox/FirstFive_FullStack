import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class MessageAPI {

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


  // ******************************************* Message methods

  static async createMessage(username, msgData) {
    let res = await this.request(`messages/${username}/create`, { ...msgData }, 'post');
    return res;
  };

  static async getAllUserMessages(username) {
    let res = await this.request(`messages/${username}/all`);
    return res;
  };

  static async viewSingleMsgData(message_id, username) {
    let res = await this.request(`messages/${username}/read/${message_id}`);
    return res;
  };

};

export default MessageAPI;