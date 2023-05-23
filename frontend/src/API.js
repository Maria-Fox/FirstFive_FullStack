import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://localhost:3001";

class API {

  // Used to authenticate user
  static token = "";

  // ******************************************* API send request method

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method, this.token, "**********");

    if (!this.token) {
      this.token = window.localStorage.getItem("token") || "invalidTemp"
    };

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${API.token}`, 'Access-Control-Allow-Origin': 'https://firstfive.onrender.comtps://firstfive.surge.sh'};
    const params = (method === "get")
      ? data
      : {};


    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // console.error("API Error:", err.message);
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




  // ******************************************* USER methods

  // Need to see about limmited views to only those who matched..


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

  // ******************************************* Match methods

  static async addMatch(username, project_id) {
    let res = await this.request(`matches/${username}/${project_id}`, {}, 'post');
    return res;
  };

  static async viewUserMatches(username) {
    let res = await this.request(`matches/${username}/all`);
    return res;
  };

  static async viewProjectUserMatches(project_id) {
    let res = await this.request(`matches/${project_id}/users`);
    return res;
  };

  static async removeUserMatch(username, project_id) {
    let res = await this.request(`matches/${username}/${project_id}`, {}, 'delete');
    return res;
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


  // class closing bracket don't delete.
};

export default API;