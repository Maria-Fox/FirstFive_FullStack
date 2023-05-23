import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ProjectMemberAPI {

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


  // ******************************************* Project Member methods

  static async addProjectMember(project_id, username) {
    let res = await this.request(`projectmembers/add/${project_id}`, { username }, 'post');
    return res;
  };

  static async viewAllProjMembers(project_id) {
    let res = await this.request(`projectmembers/${project_id}/users`);
    return res;
  };

  static async deleteProjectMember(project_id, username) {
    let res = await this.request(`projectmembers/${project_id}`, { username }, 'delete');
    return res;
  };

};


export default ProjectMemberAPI;