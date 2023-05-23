import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ProjectAPI {

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


  // ******************************************* PROJECT methods

  static async createProject(projectData) {
    let res = await this.request(`projects/add`, { ...projectData }, 'post');
    return res;
  };

  static async getAllProjects() {
    let res = await this.request(`projects/all`);
    return res;
  };

  static async getNonMatchedProjects() {
    let res = await this.request(`projects/unmatched`);
    return res;
  };

  static async carouselProjects() {
    let res = await this.request(`projects/carousel`);
    return res;
  };

  static async getUserCreatedProjects(username) {
    let res = await this.request(`projects/created/by/${username}`);
    return res;
  };

  static async viewProject(project_id) {
    let res = await this.request(`projects/${project_id}`);
    return res;
  };

  static async editProject(project_id, updateData) {
    let res = await this.request(`projects/${project_id}`, { ...updateData }, 'patch');
    return res;
  };

  static async deleteProject(project_id) {
    let res = await this.request(`projects/${project_id}`, {}, 'delete');
    return res;
  };

};

export default ProjectAPI;