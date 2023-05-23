import "./App.css"
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavRoutes from './Routes-Nav/NavRoutes';
import API from "./API";
import UserContext from './UserComponents/UserContext';
import { decodeToken } from "react-jwt";
import useLocalStorage from './Hooks/useLocalStorage';
import NavBar from './Routes-Nav/NavBar';

// ***************************************************************

// Key name for storing token in localStorage=> {token: "sdfsdf"}
export const token_storage = "token";
const sampleNote = [{ projectNote: "Sample project", note: "Message project owner for further details", additional: "Clone github repo & review." }];

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useLocalStorage(token_storage);
  const [matchedProjectIds, setMatchedProjectIds] = useState([]);
  const [notes, setNotes] = useLocalStorage("notes", sampleNote);

  const navigate = useNavigate();

  // ***************************************************************

  useEffect(function loadUserInfo() {

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          setAuthUser(username);
          // put the token on the API class for user authentication on the backend. Used to send off requests.

          API.token = token;
          // retrieve the user matches to populate approporiate projects.
          let userMatches = await API.viewUserMatches(username);
          let matchIds = userMatches.map(match => match.project_id);
          setMatchedProjectIds([...matchIds]);
        } catch (err) {
          setAuthUser(null)
        };
      };
    };

    getCurrentUser();
  }, [token]);

  // ***************************************************************


  async function registerUser(formData) {
    try {
      let token = await API.registerUser(formData);
      setToken(token);

      let { username } = decodeToken(token);
      setAuthUser(username);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function authenticateUser(formData) {
    try {
      let token = await API.authenticateUser(formData);
      setToken(token);

      // Decoding here to allow private route components to render outlet.
      let { username } = decodeToken(token);
      setAuthUser(username);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    };
  };

  // ***************************************************************


  async function logout() {
    setAuthUser(null);
    localStorage.removeItem('token');
    API.token = "";
    navigate("/auth/login");
  };


  // ***************************************************************

  return (
    <UserContext.Provider
      value={{ authUser, setAuthUser, matchedProjectIds, setMatchedProjectIds, notes, setNotes }}>
      <div id="AppID" >
        <NavBar logout={logout} />
        <NavRoutes registerUser={registerUser} authenticateUser={authenticateUser} logout={logout} />
      </div>
    </UserContext.Provider>
  );
}

export default App;