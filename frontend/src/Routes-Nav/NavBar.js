import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";
import "./NavBar.css"


const NavBar = ({ logout }) => {

  // ***************************************************************

  let { authUser } = useContext(UserContext);
  let validToken = localStorage.getItem("token");

  // ***************************************************************

  if (!authUser && !validToken) {
    return (
      <nav style={{ textAlign: "right", width: "100%", fontSize: "large", padding: ".5em" }}>

        <NavLink to="/" style={{ float: "left", padding: "0" }}
          className="NavBar-item" >FirstFive</NavLink>

        <NavLink to="/auth/login" className="NavBar-item">Login</NavLink>

        <NavLink to="/auth/register" className="NavBar-item">Register</NavLink>

        <NavLink to="/about" className="NavBar-item">About</NavLink>
      </nav >
    );
  } else {
    return (
      <nav id="navBar-nav" style={{ textAlign: "right" }}  >

        <NavLink to="/projects/umatched" className="NavBar-item" style={{ float: "left", padding: "3px" }}>Projects</NavLink>

        <NavLink to={`/matches/${authUser}/all`} className="NavBar-item">Matches</NavLink>

        <NavLink to={`/messages/${authUser}/all`} className="NavBar-item">Messages</NavLink>

        <NavLink to={`/users/${authUser}/profile`} className="NavBar-item">Profile</NavLink>

        <NavLink to={`/projects/created/by/${authUser}`} className="NavBar-item">Posts</NavLink>

        <NavLink to="/confetti" className="NavBar-item">Confetti  </NavLink>

        <Link to="/auth/login" onClick={logout} className="NavBar-item">Logout</Link>
      </nav>
    );
  };

};


export default NavBar;